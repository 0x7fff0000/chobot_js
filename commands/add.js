const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");
const { getVideoEmbed } = require("../embeds/youtube");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Добавить баса')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Силка з ютуба')
                .setRequired(true)
        ),
    async execute({ interaction }) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply('Я і так зачілений');
        }

        const urlOption = interaction.options.get('url');

        const embed = getVideoEmbed(urlOption.value);

        if (!embed) {
            return interaction.reply('Нема такого');
        }

        Song.create({
            memberId: interaction.memberId,
            guildId: interaction.guildId,
            url: urlOption.value
        });

        return interaction.reply({ embeds: [embed] });
    }
};
