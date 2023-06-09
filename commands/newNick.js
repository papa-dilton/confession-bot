import {SlashCommandBuilder} from 'discord.js'
import PocketBase from "pocketbase";
import checkNick from "../lib/checkNick.js";
import {createNick} from "../lib/checkNick.js";

const db = new PocketBase('http://127.0.0.1:8090')

const data = new SlashCommandBuilder()
    .setName('new-nick')
    .setDescription('Regenerates your nickname in this server')
const execute = async function (interaction) {
    const nick = await checkNick(interaction.user.id, interaction.guild.id);
    const newNick = createNick()
    await db.collection('nicknames').update(nick.id, {
        "nick": newNick
    })

    await interaction.deferReply()
    await interaction.reply({
        content: 'Your nickname has been changed to ' + newNick + '!',
        ephemeral: true
    });
}
export {data, execute}