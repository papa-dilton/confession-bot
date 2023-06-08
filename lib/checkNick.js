import PocketBase from "pocketbase";
import fs from 'fs';
import checkUser from "./checkUser.js";

function getWordFromFile(pathToFile) {
    const data = fs.readFileSync(pathToFile, 'utf8',)

    const wordArray = data.split('\r\n');
    let randomIndex = 0;

    // Make sure we don't get the first line, which gives credit to the original author
    do {
        randomIndex = Math.floor(Math.random() * wordArray.length);
    } while (randomIndex === 0)

    return wordArray[randomIndex];
}

export function createNick() {
    const adjective = getWordFromFile('./lib/adjectives.txt');
    const noun = getWordFromFile('./lib/nouns.txt');
    return `${adjective} ${noun}`
}



const db = new PocketBase('http://127.0.0.1:8090')


// Check if a nick is in the database, and if not, add them
export default async function checkNick(discordId, guildId) {
    let nick;
    let user = await checkUser(discordId);
    try {
        nick = await db.collection('nicknames').getFirstListItem(`user_id="${user.id}"`);
    } catch (e) {
        if (e.status === 404) {
            // If no user is found, create one
            nick = await db.collection('nicknames').create({
                "user_id": user.id,
                "nick": createNick(),
                "guild_id": guildId
            });
        } else {
            // Otherwise, throw the error
            throw e;
        }
    }
    return nick;
}


