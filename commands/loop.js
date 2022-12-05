const { SlashCommandBuilder } = require("@discordjs/builders");
const Setting = require("../models/setting");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Повторювать бас'),
    async execute({ interaction }) {
        const loopSetting = await Setting.get(interaction.guildId, 'loop_song', '', true);

        await loopSetting.update({
            value: loopSetting.value ? '' : 'true'
        });

        return interaction.reply(`${loopSetting.value ? 'На' : 'Не на'} повторі`);
    }
};
