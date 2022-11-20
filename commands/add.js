const { SlashCommandBuilder } = require("@discordjs/builders");
const { getVoiceConnection } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Добавить баса'),
    async execute({ interaction, guildsCache }) {
        return interaction.reply('Робиться');

        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply('Я і так зачілений');
        }

        try {
            var { videoDetails } = await ytdl.getBasicInfo(urlOption.value);
        } catch (e) {
            return interaction.reply('Нема такого');
        }

        const embed = new EmbedBuilder()
            .setTitle(videoDetails.title)
            .setURL(videoDetails.video_url)
            .setThumbnail(videoDetails.thumbnails.at(-1).url ?? '')
            .setAuthor({
                name: videoDetails.author.name,
                url: videoDetails.author.channel_url,
                iconURL: videoDetails.author.thumbnails.at(-1).url
            })
            .setDescription(videoDetails.description)
            .setFooter({
                iconURL: interaction.user.avatarURL(),
                text: interaction.member.displayName
            })
            .setTimestamp(Date.now());

        const songs = guildsCache[interaction.guild.id]?.songs ?? [];
        songs.push({
            url: videoDetails.video_url,
            member: interaction.member,
            date: Date.now()
        });

        guildsCache[interaction.guild.id].songs = songs;

        return interaction.reply({ embeds: [embed] });
    }
};
