 import unittest
from fixorium_wallet.fixorium_wallet import FixoriumWallet

class TestFixoriumWallet(unittest.TestCase):
    def test_generate_keys(self):
        wallet = FixoriumWallet()
        wallet.generate_keys()
        self.assertIsNotNone(wallet.private_key)
        self.assertIsNotNone(wallet.public_key)
        self.assertIsNotNone(wallet.address)

    def test_save_wallet(self):
        wallet = FixoriumWallet()
        wallet.generate_keys()
        wallet.save_wallet()
        self.assertTrue(os.path.exists('wallets/fixorium_wallet.json'))

    def test_load_wallet(self):
        wallet = FixoriumWallet()
        wallet.load_wallet()
        self.assertIsNotNone(wallet.private_key)
        self.assertIsNotNone(wallet.public_key)
        self.assertIsNotNone(wallet.address)

if __name__ == '__main__':
    unittest.main()
