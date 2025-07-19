 // pages/index.jsx
import { useState, useEffect } from 'react';
import { getSolanaConnection, TOKEN_PROGRAM_ID } from '../lib/solana';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import Image from 'next/image';
import SwapComponent from '../components/SwapComponent';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css');

const network = WalletAdapterNetwork.Mainnet;
const endpoint = 'https://api.mainnet-beta.solana.com';
const wallets = [new PhantomWalletAdapter()];

export default function Home() {
    const [solBalance, setSolBalance] = useState(0);
    const [fixoriumBalance, setFixoriumBalance] = useState(0);
    const [walletAddress, setWalletAddress] = useState(null);

    const FIXORIUM_TOKEN_MINT = new PublicKey('FIXORIUM_TOKEN_MINT_ADDRESS_HERE');

    useEffect(() => {
        if (!walletAddress) return;

        const fetchBalances = async () => {
            const connection = new Connection(endpoint);
            const balance = await connection.getBalance(walletAddress);
            setSolBalance(balance / LAMPORTS_PER_SOL);

            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAddress, {
                programId: TOKEN_PROGRAM_ID,
            });

            const fixerToken = tokenAccounts.value.find(
                acc => acc.account.data.parsed.info.mint === FIXORIUM_TOKEN_MINT.toString()
            );

            const amount = fixerToken ? fixerToken.account.data.parsed.info.tokenAmount.uiAmount : 0;
            setFixoriumBalance(amount);
        };

        fetchBalances();
    }, [walletAddress]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="min-h-screen bg-gray-100 p-8">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Fixorium Wallet</h1>
                                <WalletMultiButton onConnect={(address) => setWalletAddress(address)} />
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
                                <div className="flex items-center space-x-4">
                                    <Image src="/fixorium-logo.png" alt="Fixorium Logo" width={48} height={48} />
                                    <div>
                                        <p><strong>Wallet Address:</strong> {walletAddress ? walletAddress.toBase58() : 'Not connected'}</p>
                                        <p><strong>SOL Balance:</strong> {solBalance.toFixed(4)}</p>
                                        <p><strong>Fixorium Balance:</strong> {fixoriumBalance}</p>
                                    </div>
                                </div>
                            </div>

                            <SwapComponent walletAddress={walletAddress} />
                        </div>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
