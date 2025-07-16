 import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { PhantomProvider } from '@solana/wallet-adapter-phantom';
import { Jupiter } from '@jup-ag/core';
import './App.css';

const App = () => {
  const [wallet, setWallet] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      const provider = new PhantomProvider();
      try {
        const connected = await provider.connect();
        setWallet(connected);
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);

  const swapTokens = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const connection = new Connection('https:                                
      const jupiter = await Jupiter.load({
        connection,
        cluster: 'mainnet-beta',
      });
      const routes = await jupiter.getRoutes({
        inputMint: 'SOL_MINT_ADDRESS',
        outputMint: 'MEME_TOKEN_MINT_ADDRESS',
        amount: 1,
      });
      await jupiter.swap({
        route: routes[0],
        userPublicKey: wallet.publicKey,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <img
        src="https:                          
        alt="FIXORIUM Logo"
        className="logo"
      />
      <h1>FIXERCOIN</h1>
      <button
        onClick={swapTokens}
        className="swap-button"
        disabled={loading}
      >
        {loading ? '"
        disabled={loading}
      >
        {loading ? 'Swapping...' : 'Swap SOL for Meme Tokens'}
      </button>
      <div className=""tokens-list"">
        {tokens.length > 0 ? (
          tokens.map((token) => (
            <div key={token.mint} className=""token-item">
              {token.name}
            </div>
          ))
        ) : (
          <p>No tokens found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
        
