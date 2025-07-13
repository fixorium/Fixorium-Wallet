const fixorium = new Fixorium(new solana.Connection('https://api.mainnet-beta.solana.com'));
let wallet;
let token1;
let token2;
let amount;

// Create wallet
async function createWallet() {
  try {
    wallet = await fixorium.createWallet();
    console.log(`Wallet created: ${wallet.publicKey.toString()}`);
  } catch (error) {
    console.error(`Error creating wallet: ${error.message}`);
  }
}

// Get token balance
async function getTokenBalance(tokenAddress) {
  try {
    const balance = await fixorium.getBalance(wallet.publicKey, tokenAddress);
    console.log(`Token balance: ${balance}`);
    return balance;
  } catch (error) {
    console.error(`Error getting token balance: ${error.message}`);
  }
