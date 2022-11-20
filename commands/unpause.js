const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Продовжить розбасовку'),
    async execute({ interaction }) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply('Так чіл ж');
        }

        connection.state.subscription.player.unpause();

        return interaction.reply('Басуєм дальше');
    }
};
