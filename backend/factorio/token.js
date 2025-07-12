import { promises as fs } from 'fs';  // use promises for async/await
import crypto from 'crypto';

class TokenVault {
  constructor(s_time, e_time, usr, phr, str, n) {
    this.s_time = s_time;
    this.e_time = e_time;
    this.usr = usr;
    this.phr = phr;
    this.str = str;
    this.n = n;
    this.token = null;
    this.hashedToken = null;
  }

  formatTime(date) {
    let h = date.getHours().toString().padStart(2, '0');
    let m = date.getMinutes().toString().padStart(2, '0');
    let s = date.getSeconds().toString().padStart(2, '0');
    return `${h}/${m}/${s}`;
  }

  async getRandomPhrase(filePath = './phrase.txt') {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const words = data.split('\n').filter(Boolean);
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    } catch (err) {
      console.error('Error reading phrase file:', err);
      return 'defaultphrase';  // fallback phrase
    }
  }

  async Generate() {
    let s_time_str = this.s_time instanceof Date ? this.formatTime(this.s_time) : this.s_time;
    let e_time_str = this.e_time instanceof Date ? this.formatTime(this.e_time) : this.e_time;

    const randStr = Math.random().toString(36).substring(2, 10);

    // Get random phrase from phrase.txt
    const randomPhrase = await this.getRandomPhrase();

    // Build the token string including the random phrase (replacing this.phr or adding extra)
    this.token = `${s_time_str}-${this.usr}-${e_time_str}-${randomPhrase}-${randStr}`;

    // Hash and salt the token using crypto (SHA-256 + random salt)
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHmac('sha256', salt).update(this.token).digest('hex');

    this.hashedToken = `${salt}$${hash}`;  // store salt + hash separated by $

    console.log('Generated Token:', this.token);
    console.log('Hashed & Salted Token:', this.hashedToken);

    return this; // for chaining, still async though
  }

  Verify() {
    if (this.hashedToken) {
      console.log('✅ Token verified (exists)');
    } else {
      console.log('❌ No token to verify');
    }
    return this;
  }
}

// Usage:
(async () => {
  const now = new Date();
  const threeHoursLater = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  const vault = new TokenVault(now, threeHoursLater, 'BranacleDude', '', '', 42);
  await vault.Generate();
  vault.Verify();

  // Send vault.hashedToken to frontend securely
})();
    