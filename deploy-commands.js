import { REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config()


const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(dirname(fileURLToPath(import.meta.url)), 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            //Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();