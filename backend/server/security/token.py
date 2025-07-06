import time
import random
import string
import hashlib

class TokenConstructor():
    def __init__(self, username, ttl=''):
        self.username = username
        self.ttl = ttl
        self.t_start = int(time.time())
        self.t_end = self.t_start + self.ttl

    def GetRandomPhrase(self, file_path="phrases.txt"):
        with open(file_path) as f:
            lines = f.read().splitlines()
        return random.choice(lines)

    def GetRandomString(self, length=36):
        chars = string.ascii_letters + string.digits + "!@#$%^&*()-_=+[]{}|;:',.<>?/"
        return ''.join(random.choices(chars, k=length))

    def Generate(self):
        phrase = self.GetRandomPhrase()
        random_string = self.GetRandomString()

        raw_token = f"{self.t_start}|{self.username}|{phrase}|{random_string}|{self.t_end}"
        hashed_token = hashlib.sha256(raw_token.encode()).hexdigest()

        return raw_token, hashed_token, self.t_start, self.t_end


TC = TokenConstructor("beaverLord", 7200)
rt, ht, t_start, t_end = TC.Generate()

print(f"Raw Token: {rt}\nEncoded Token: {ht}")
