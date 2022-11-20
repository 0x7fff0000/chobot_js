const { ModalBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('python')
        .setDescription('Тест на пітонщіка'),
    customId: 'testModal',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId(this.customId)
            .setTitle('Тест на пітонщіка');
        
        const resultInput = new TextInputBuilder()
            .setCustomId('resultInput')
            .setLabel("print('228'[::-1])")
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const actionRow = new ActionRowBuilder().addComponents(resultInput);
        modal.addComponents(actionRow);

        return interaction.showModal(modal);
    },
    async submit(interaction) {
        const bValid = interaction.fields.getTextInputValue('resultInput') === '822';

        return interaction.reply(bValid ? '+' : '-');
    }
};
