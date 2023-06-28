import {ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle} from 'discord.js'
import checkUser from "../lib/checkUser.js";
import PocketBase from "pocketbase";
import checkNick from "../lib/checkNick.js";

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
    .addBooleanOption(option =>
        option.setName('anonymous')
            .setDescription('Whether or not to post fully anonymously'))


const execute = async function (interaction) {
    interaction.deferReply({ephemeral: true});

    const userRecord = await checkUser(interaction.user.id)

    // If the user is muted, exit early
    const muteDateObject = new Date(userRecord.mute_until)
    if (muteDateObject >= Date.now()) {
        await interaction.followUp({content: `You are muted until ${muteDateObject.toDateString()} and cannot confess.`, ephemeral: true});
        return;
    }

    const confession = interaction.options.getString('confession');
    const title = interaction.options.getString('title');
    const channel = interaction.channel;

    const reportButton = new ButtonBuilder()
        .setCustomId('report')
        .setLabel('Report confession')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder()
        .addComponents(reportButton);


    // Set the nick to Anonymous if the anonymous option is true, otherwise get the user's nick
    let nick;
    if (interaction.options.getBoolean('anonymous') == null || interaction.options.getBoolean('anonymous') === false){
        nick = await checkNick(interaction.user.id, interaction.guild.id)
    } else {
        nick = {
            nick: 'Anonymous'
        }
    }
    let msgContent = `${nick.nick} says:\n`
    if (title != null) {
        // Add optional title field
        msgContent += `**${title}**\n`
    }
    msgContent += confession

    // Send the message
    const confessionMessage = await channel.send({
        content: msgContent,
        components: [row]
    });

    // Create the confession record in the database
    const data = {
        "user_id": userRecord.id,
        "msg_id": `${confessionMessage.id}`,
        "channel_id": `${confessionMessage.channelId}`,
        "guild_id": `${confessionMessage.guildId}`,
        "reports": 0
    };
    const record = await db.collection('confessions').create(data);

    // Handle DB errors
    if (record.user_id !== userRecord.id) {
        confessionMessage.delete();
        throw new Error('Something went wrong while creating the confession record.');
    }
    await interaction.followUp({content: 'Your confession has been sent!', ephemeral: true});
}

export {data, execute}