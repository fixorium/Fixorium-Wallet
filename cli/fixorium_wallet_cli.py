 import argparse

def main():
    parser = argparse.ArgumentParser(description='Fixorium Wallet CLI')
    parser.add_argument('--generate-keys', action='store_true', help='Generate new keys')
    parser.add_argument('--save-wallet', action='store_true', help='Save wallet to file')
    parser.add_argument('--load-wallet', action='store_true', help='Load wallet from file')
    args = parser.parse_args()

    fixorium_wallet = FixoriumWallet()

    if args.generate_keys:
        fixorium_wallet.generate_keys()
        print("Keys generated successfully.")

    if args.save_wallet:
        fixorium_wallet.save_wallet()
        print("Wallet saved successfully.")

    if args.load_wallet:
        fixorium_wallet.load_wallet()
        print("Wallet loaded successfully.")

if __name__ == '__main__':
    main()
