const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
		.setDescription('leave a confession anonymously')
        .addStringOption(option =>
            option.setName('confession')
                .setDescription('The story to confess to others')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The optional title of the confession'))
    ,
	async execute(interaction) {
        const confession = interaction.options.getString('confession');
        const title = interaction.options.getString('title');
        const channel = interaction.channel;

        const reportButton = new ButtonBuilder()
			.setCustomId('report')
			.setLabel('Report confession')
			.setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(reportButton);

        const confessionMessage = channel.send({
            content: title ? `**${title}**\n` : '' + confession,
            components: [row]
        });
		await interaction.reply({ content: 'Your confession has been sent!', ephemeral: true});
	}

}