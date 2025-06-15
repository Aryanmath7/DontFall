// If using a bundler (recommended), use:
import { Client } from 'https://esm.sh/colyseus.js';

export async function connect() {
    const client = new Client('http://localhost:2567');
    const room = await client.joinOrCreate('my_room');
    return { client, room };
}

export function getPlatformData(room) {

    room.send("get_platform");

    // Return a promise that resolves when platform_data is received
    return new Promise((resolve) => {
        room.onMessage("platform_data", (platformData) => {
            //console.log("Received platform data:", platformData);
            resolve(platformData);
        });
    });
}

