const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Піти розпалить котла'),
    async execute({ interaction }) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply('Зачілься');
        }

        connection.destroy();

        return interaction.reply('bb');
    }
};
