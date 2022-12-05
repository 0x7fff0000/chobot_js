const { EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.getVideoEmbed = async (song) => {
    let videoDetails = {};

    try {
        videoDetails = (await ytdl.getBasicInfo(song.url)).videoDetails;
    } catch (e) {
        return null;
    }

    return new EmbedBuilder()
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
            iconURL: song.member.avatarURL(),
            text: song.member.displayName
        })
        .setTimestamp(song.date);
}
