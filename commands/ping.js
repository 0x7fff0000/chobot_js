const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Проверка'),
    async execute({ interaction }) {
        return interaction.reply('Pong!');
    },
};
