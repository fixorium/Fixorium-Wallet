const Fixorium = require('fixorium-library');
const Connection = require('@solana/web3.js').Connection;
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

class FixoriumWallet {
  constructor(connection) {
    this.connection = connection;
    this.fixorium = new Fixorium(connection);
  }

  async createWallet() {
    const wallet = await this.fixorium.createWallet();
    return wallet;
  }

  async addFixoriumCoin(wallet) {
    const token = new Token(
      this.connection,
      TOKEN_PROGRAM_ID,
      'FIXORIUM',
      'FIXO',
      9
    );

    const mintAddress = await token.createMint(
      this.connection,
      wallet,
      wallet.publicKey,
      null,
      9
    );

    await token.mintTo(
      this.connection,
      wallet,
      mintAddress,
      wallet.publicKey,
      100000000 * Math.pow(10, 9)
    );

    return mintAddress;
  }

  async getBalance(wallet) {
    const balance = await this.fixorium.getBalance(wallet.publicKey);
    return balance;
  }

  async getTokenBalance(wallet, tokenAddress) {
    const tokenBalance = await this.fixorium.getTokenBalance(wallet.publicKey, tokenAddress);
    return tokenBalance;
  }
}

const connection = new Connection('https:                          
const fixoriumWallet = new FixoriumWallet(connection);

async function main() {
  const wallet = await fixoriumWallet.createWallet();
  console.log('//api.devnet.solana.com');
const fixoriumWallet = new FixoriumWallet(connection);

async function main() {
  const wallet = await fixoriumWallet.createWallet();
  console.log('Wallet created:', wallet.publicKey.toString());

  const fixoriumCoinAddress = await fixoriumWallet.addFixoriumCoin(wallet);
  console.log('Fixorium coin added to wallet:', fixoriumCoinAddress.toString());

  const balance = await fixoriumWallet.getBalance(wallet);
  console.log('Wallet balance:', balance);

  const tokenBalance = await fixoriumWallet.getTokenBalance(wallet, fixoriumCoinAddress);
  console.log('Fixorium coin balance:', tokenBalance);
}

main();
