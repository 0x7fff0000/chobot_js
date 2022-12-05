const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const ytdl = require('ytdl-core');
const { getVideoEmbed } = require("../embeds/youtube");
const Setting = require("../models/setting");
const Song = require("../models/song");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Навалить баса')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('Силка з ютуба')
                .setRequired(true)
        ),
    async execute({ interaction }) {
        const channelId = interaction.member.voice.channel?.id ?? null;

        if (!channelId) {
            return interaction.reply('Зайди но в войс');
        }

        const urlOption = interaction.options.get('url');

        const embed = await getVideoEmbed({ url: urlOption.value, member: interaction.member, date: new Date() });

        if (!embed) {
            return interaction.reply('Нема такого');
        }

        Song.create({
            memberId: interaction.memberId,
            guildId: interaction.guildId,
            url: urlOption.value
        });

        const stream = ytdl(urlOption.value, { quality: 'highestaudio', filter: 'audioonly' });

        const connection = joinVoiceChannel({
            channelId,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        connection.subscribe(player);
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, async () => {
            const guildId = interaction.guildId;
            const loopSetting = await Setting.get(guildId, 'loop_song', '');
            const bLoop = loopSetting.value === 'true';

            const songs = await Song.findAll({
                where: {
                    guildId,
                    played: false
                },
                limit: 2
            });

            let nextSong = null;

            if (bLoop) {
                nextSong = songs[0];
            } else {
                await songs[0].update({
                    played: true
                });

                if (songs.length < 2) {
                    connection.destroy();

                    return;
                }

                nextSong = songs[1];
            }

            const stream = ytdl(nextSong.url, { quality: 'highestaudio', filter: 'audioonly' });
            const resource = createAudioResource(stream);

            player.play(resource);
        });

        return interaction.reply({ embeds: [embed] });
    }
};
