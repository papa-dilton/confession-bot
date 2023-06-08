import PocketBase from "pocketbase";

const db = new PocketBase('http://127.0.0.1:8090')


// Check if a user is in the database, and if not, add them
export default async function checkUser(discordId) {
    let user;
    try {
        user = await db.collection('users').getFirstListItem(`discord_id="${discordId}"`);
    } catch (e) {
        if (e.status === 404) {
            // If no user is found, create one
            user = await db.collection('users').create({
                "discord_id": discordId,
            });
        } else {
            // Otherwise, throw the error
            throw e;
        }
    }
    return user;
}