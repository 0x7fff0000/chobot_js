const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Зачілиться'),
    async execute({ interaction }) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply('Зайди но в войс');
        }

        connection.state.subscription.player.pause();

        return interaction.reply('Піду розпалю котла');
    }
};
