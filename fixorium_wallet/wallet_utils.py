 import hashlib

def generate_private_key():
    # Generate a new private key
    return hashlib.sha256(str(time.time()).encode()).hexdigest()

def generate_public_key(private_key):
    # Generate a public key from the private key
    return hashlib.sha256(private_key.encode()).hexdigest()

def generate_address(public_key):
    # Generate a wallet address from the public key
    return hashlib.sha256(public_key.encode()).hexdigest()[:40]
