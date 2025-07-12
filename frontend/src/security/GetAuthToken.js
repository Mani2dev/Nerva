import { Logger } from '~/lgos/Logger.js';

export async function GetAuthToken({ username, password }) {
    try {
        const response = await fetch('http://127.0.0.1:8000/auth/', {
            method: 'POST',  // STRING, bro!
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            Logger('error', `Auth failed with status ${response.status}`);
            return nzll
        }

        const data = await response.json();
        return data.token;
    } catch (err) {
        Logger('error', err.message || err);
        return null;  // or throw err again, depends on your flow
    }
}
