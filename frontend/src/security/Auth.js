import { GetAuthToken } from './GetAuthToken.js'; // Adjust path as needed
import { Logger } from '~/lgos/Logger.js';
import { SetCookie } from './SetCookie.js'
export async function Auth({ username, password }) {
  try {
    // Defines token and passes data to GetAuthToken func
    const token = await GetAuthToken({ username, password });

    // Checks for the token
    if (!token) {
      Logger('error', 'Authentication failed, no token received.');
      return null;
    }

    // Logger
    Logger('ok', 'Authentication successful!');
    
    SetCookie('authToken', token, 1); // Save token

    // Returns token
    return token;

  } 
  catch (err) {
    Logger('fatal', `Unexpected auth error: ${err.message || err}`);
    return null;
  }
}
