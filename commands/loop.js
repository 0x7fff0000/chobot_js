const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");
const playCommand = require('./play');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Повторювать бас'),
    async execute({ interaction, guildsCache }) {
        return interaction.reply('Робиться');

        const guildCache = guildsCache[interaction.guild.id];

        if (!guildCache) {
            guildsCache[interaction.guild.id] = {};
        }

        guildsCache[interaction.guild.id].loop = !(guildsCache[interaction.guild.id]?.loop ?? false);
        
        return interaction.reply(`${guildsCache[interaction.guild.id].loop ? 'На повторе' : 'Одноразка'}`);
    }
};
