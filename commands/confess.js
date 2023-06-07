import {ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle} from 'discord.js'
import PocketBase from "pocketbase";
const db = new PocketBase('http://127.0.0.1:8090')


const data = new SlashCommandBuilder()
    .setName('confess')
    .setDescription('leave a confession pseudonymously')
    .addStringOption(option =>
        option.setName('confession')
            .setDescription('The story to confess to others')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('title')
            .setDescription('The optional title of the confession'))

const execute = async function (interaction) {
    const confession = interaction.options.getString('confession');
    const title = interaction.options.getString('title');
    const channel = interaction.channel;

    const reportButton = new ButtonBuilder()
        .setCustomId('report')
        .setLabel('Report confession')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder()
        .addComponents(reportButton);

    const confessionMessage = await channel.send({
        content: title ? `**${title}**\n` : '' + confession,
        components: [row]
    });

    const userRecord = await db.collection('users').getFirstListItem(`discord_id="${interaction.user.id}"`);
    const data = {
        "user_id": userRecord.id,
        "msg_id": `${confessionMessage.id}`,
        "channel_id": `${confessionMessage.channelId}`,
        "guild_id": `${confessionMessage.guildId}`,
        "reports": 0
    };
    const record = await db.collection('confessions').create(data);

    if (record.user_id !== userRecord.id) {
        confessionMessage.delete();
        throw new Error('Something went wrong while creating the confession record.');
    }
    await interaction.reply({content: 'Your confession has been sent!', ephemeral: true});
}

export {data, execute}