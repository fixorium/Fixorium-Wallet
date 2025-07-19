 import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Jupiter, RouteInfo } from '@jup-ag/core';

const connection = new Connection('https://api.devnet.solana.com');

const inputMints = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
};

const outputMints = {
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  SOL: 'So11111111111111111111111111111111111111112',
};

const SwapComponent = () => {
  const [inputToken, setInputToken] = useState('SOL');
  const [outputToken, setOutputToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState(null);
  const [jupiter, setJupiter] = useState(null);

  // Initialize Jupiter instance once
  useEffect(() => {
    const initJupiter = async () => {
      const jup = await Jupiter.load({
        connection,
        cluster: 'devnet',
        userPublicKey: new PublicKey('YOUR_WALLET_PUBLIC_KEY'), // Replace with connected wallet
        routeCacheDuration: 0,
      });
      setJupiter(jup);
    };

    initJupiter();
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!jupiter || !amount || isNaN(amount)) return;

      const inputMint = new PublicKey(inputMints[inputToken]);
      const outputMint = new PublicKey(outputMints[outputToken]);

      try {
        const routes = await jupiter.computeRoutes({
          inputMint,
          outputMint,
          amount: Math.floor(Number(amount) * 1e9), // assuming 9 decimals for input
          slippageBps: 100, // 1%
        });

        if (routes && routes.routesInfos.length > 0) {
          setQuote(routes.routesInfos[0]);
        } else {
          setQuote(null);
        }
      } catch (err) {
        console.error('Failed to get quote:', err);
        setQuote(null);
      }
    };

    fetchQuote();
  }, [jupiter, inputToken, outputToken, amount]);

  const handleSwap = async () => {
    if (!quote || !jupiter) return;

    try {
      const { execute } = await jupiter.exchange({
        routeInfo: quote,
      });

      const txid = await execute();
      console.log('Transaction sent:', txid);
    } catch (err) {
      console.error('Swap failed:', err);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={inputToken} onChange={(e) => setInputToken(e.target.value)}>
        <option value="SOL">SOL</option>
        <option value="USDC">USDC</option>
      </select>
      <select value={outputToken} onChange={(e) => setOutputToken(e.target.value)}>
        <option value="USDC">USDC</option>
        <option value="SOL">SOL</option>
      </select>
      <button onClick={handleSwap} disabled={!quote}>Swap</button>
      {quote && (
        <p>
          You will receive {quote.outAmount / 1e6} {outputToken}
        </p>
      )}
    </div>
  );
};

export default SwapComponent;
