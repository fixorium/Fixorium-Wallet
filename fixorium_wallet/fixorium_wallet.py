 import hashlib
import hmac
import json
import os
import time

class FixoriumWallet:
    def __init__(self):
        self.private_key = ''
        self.public_key = ''
        self.address = ''

    def generate_keys(self):
        # Generate a new private key
        self.private_key = hashlib.sha256(str(time.time()).encode()).hexdigest()

        # Generate a public key from the private key
        self.public_key = hashlib.sha256(self.private_key.encode()).hexdigest()

        # Generate a wallet address from the public key
        self.address = hashlib.sha256(self.public_key.encode()).hexdigest()[:40]

    def save_wallet(self):
        # Save the wallet to a file
        wallet_data = {
            'private_key': self.private_key,
            'public_key': self.public_key,
            'address': self.address
        }
        with open('fixorium_wallet.json', 'w') as f:
            json.dump(wallet_data, f)

    def load_wallet(self):
        # Load the wallet from a file
        try:
            with open('fixorium_wallet.json', 'r') as f:
                wallet_data = json.load(f)
                self.private_key = wallet_data['private_key']
                self.public_key = wallet_data['public_key']
                self.address = wallet_data['address']
        except FileNotFoundError:
            print("Wallet file not found.")

    def sign_transaction(self, transaction):
        # Sign a transaction with the private key
        signature = hmac.new(self.private_key.encode(), transaction.encode(), hashlib.sha256).hexdigest()
        return signature

# Create a new wallet instance
fixorium_wallet = FixoriumWallet()
