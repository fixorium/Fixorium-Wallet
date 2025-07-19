 import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
export const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);
export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
export const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
export const FIXERCOIN_MINT = new PublicKey(
  "FIXERCOIN_MINT_ADDRESS_HERE"
);
