import fs from 'node:fs'
import path from 'node:path'
import {Client, Collection, Events, GatewayIntentBits} from 'discord.js'
import dotenv from 'dotenv'
import PocketBase from 'pocketbase'
import {dirname} from "path";
import {fileURLToPath} from "url";


// Load environment variables from .env file
dotenv.config()
// Create a new database instance
const db = new PocketBase('http://127.0.0.1:8090')

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();

// Read all command files
const commandsPath = path.join(dirname(fileURLToPath(import.meta.url)), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command =  await import(`./commands/${file}`)
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
    }
}


// Receive interaction creations
client.on(Events.InteractionCreate, async interaction => {

    // Accept slash commands
    if (interaction.isChatInputCommand()) {
        // Get the command from the collection
        const command = interaction.client.commands.get(interaction.commandName);

        // If the command doesn't exist, exit early
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        // Execute the command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }

    // Accept button clicks
    else if (interaction.isButton()) {
        // If user has reported a post, add it to the database
        if (interaction.customId === 'report') {
            // Find confession in database and update
            const confession = await db.collection('confessions').getFirstListItem(`msg_id="${interaction.message.id}" && channel_id="${interaction.message.channelId}" && guild_id="${interaction.message.guildId}"`);
            confession.reports += 1;
            await db.collection('confessions').update(confession.id, confession);

            await interaction.reply({content: 'Your report has been sent!', ephemeral: true});
        }
    }

    //Reject all other interactions
    else {
        throw new Error(`[ERROR] Received interaction of type ${interaction.type} and name ${interaction.commandName}. Ignoring...`);
    }
});





client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});


// Log in to Discord with your client's token
client.login(process.env.TOKEN);