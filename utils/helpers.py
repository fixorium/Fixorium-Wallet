 import hashlib

def hash_string(input_string):
    # Hash a string using SHA-256
    return hashlib.sha256(input_string.encode()).hexdigest()

def validate_address(address):
    # Validate a wallet address
    if len(address) != 40:
        return False
    try:
        int(address, 16)
        return True
    except ValueError:
        return False
