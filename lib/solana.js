import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

export const getSolanaConnection = () => {
  return new Connection(clusterApiUrl("devnet"), "confirmed");
};

export const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

