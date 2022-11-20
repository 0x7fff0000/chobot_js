const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Навалить баса')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('Силка з ютуба')
                .setRequired(true)
        ),
    async execute({ interaction, guildsCache }) {
        const channelId = interaction.member.voice.channel?.id ?? null;

        if (!channelId) {
            return interaction.reply('Зайди но в войс');
        }

        const urlOption = interaction.options.get('url');

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
                iconURL: interaction.member.avatarURL(),
                text: interaction.member.displayName
            })
            .setTimestamp(Date.now());

        const stream = ytdl(videoDetails.video_url, { quality: 'highestaudio', filter: 'audioonly' });

        const connection = joinVoiceChannel({
            channelId,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, () => {
            // if (!(guildsCache[interaction.guild.id]?.loop ?? false)) {
                connection.destroy();
            // }

            // player.play(ytdl(videoDetails.video_url, { quality: 'highestaudio', filter: 'audioonly' }));
        });

        return interaction.reply({ embeds: [embed] });
    }
};
