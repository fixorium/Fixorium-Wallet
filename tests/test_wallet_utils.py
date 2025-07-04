 import unittest
from fixorium_wallet.wallet_utils import generate_private_key, generate_public_key, generate_address

class TestWalletUtils(unittest.TestCase):
    def test_generate_private_key(self):
        private_key = generate_private_key()
        self.assertIsNotNone(private_key)

    def test_generate_public_key(self):
        private_key = generate_private_key()
        public_key = generate_public_key(private_key)
        self.assertIsNotNone(public_key)

    def test_generate_address(self):
        private_key = generate_private_key()
        public_key = generate_public_key(private_key)
        address = generate_address(public_key)
        self.assertIsNotNone(address)

if __name__ == '__main__':
    unittest.main()
