 import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { createTransferInstruction, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import base58 from 'bs58';

const connection = new Connection(clusterApiUrl('mainnet-beta'));
const airdropAmount = 1000; // amount in tokens
const FIXERCOIN_MINT = new PublicKey('YOUR_FIXERCOIN_MINT_ADDRESS');

// Load wallet from secret key (store securely, not in code in real apps!)
const secretKey = base58.decode(process.env.AIRDROP_SECRET); // store base58 private key in env
const sender = Keypair.fromSecretKey(secretKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  try {
    const { wallet } = req.body;
    const userPubkey = new PublicKey(wallet);

    const senderATA = await getOrCreateAssociatedTokenAccount(connection, sender, FIXERCOIN_MINT, sender.publicKey);
    const receiverATA = await getOrCreateAssociatedTokenAccount(connection, sender, FIXERCOIN_MINT, userPubkey);

    const tx = await connection.sendTransaction(
      await createTransferInstruction(senderATA.address, receiverATA.address, sender.publicKey, airdropAmount * 10 ** 6),
      [sender]
    );

    return res.status(200).json({ success: true, tx });
  } catch (err) {
    console.error('Airdrop error:', err);
    return res.status(500).json({ error: 'Airdrop failed' });
  }
}
  
