require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const config = require('./config');

global.sequelize = require('./database');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async interaction => {
    const bModalSubmit = interaction.isModalSubmit();

    if (!interaction.isChatInputCommand() && !bModalSubmit) {
        return;
    }

    const command = bModalSubmit ? client.commands.find((value) => (value.customId ?? '') === interaction.customId) : client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        if (bModalSubmit) {
            await command.submit(interaction);

            return;
        }

        await command.execute({ interaction });
    } catch (error) {
        console.error(error);

        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.once(Events.ClientReady, () => {
    global.sequelize.authenticate().then(() => {
        console.log('Connected to DB');

        const commandsPath = path.join(__dirname, 'models');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            
            require(filePath);
        }

        global.sequelize.sync({ force: config.database.force_sync }).then(() => console.log('DB synchronized'))
    });

    console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.bot.token);
