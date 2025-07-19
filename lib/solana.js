 import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const SOLANA_NETWORK = 'mainnet-beta';
export const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), 'confirmed');

export const FEE_RECIPIENT = new PublicKey('H4qKn8FMFha8jJuj8xMryMqRhH3h7GjLuxw7TVixpump');
export const FEE_BPS = 3; // 0.03%
