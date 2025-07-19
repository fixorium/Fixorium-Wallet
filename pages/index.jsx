 import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Jupiter } from '@jup-ag/sdk":^4.0.0'; 

const inputMints = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
};

const outputMints = {
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  SOL: 'So11111111111111111111111111111111111111112'
};

const SwapComponent = () => {
  const [inputToken, setInputToken] = useState('SOL');
  const [outputToken, setOutputToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState(null);
  const [jupiter, setJupiter] = useState(null);

  useEffect(() => {
    const initJupiter = async () => {
      const connection = new Connection('https://api.devnet.solana.com');
      try {
        const jup = await Jupiter.load({
          connection,
          cluster: 'devnet',
          userPublicKey: new PublicKey('11111111111111111111111111111111'), // Dummy wallet
          routeCacheDuration: 0
        });
        setJupiter(jup);
      } catch (err) {
        console.error('Jupiter init failed:', err);
      }
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
          amount: Math.floor(Number(amount) * 1e9),
          slippageBps: 100
        });

        if (routes && routes.routesInfos.length > 0) {
          setQuote(routes.routesInfos[0]);
        } else {
          setQuote(null);
        }
      } catch (err) {
        console.error('Quote fetch failed:', err);
        setQuote(null);
      }
    };

    fetchQuote();
  }, [jupiter, inputToken, outputToken, amount]);

  const handleSwap = async () => {
    if (!quote || !jupiter) return;

    try {
      const { execute } = await jupiter.exchange({
        routeInfo: quote
      });

      const txid = await execute();
      console.log('Transaction sent:', txid);
    } catch (err) {
      console.error('Swap failed:', err);
    }
  };

  return (
    <div className="container">
      <h2>Solana Token Swap</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="row">
        <select value={inputToken} onChange={(e) => setInputToken(e.target.value)}>
          <option value="SOL">SOL</option>
          <option value="USDC">USDC</option>
        </select>
        <span style={{ margin: '0 10px' }}>→</span>
        <select value={outputToken} onChange={(e) => setOutputToken(e.target.value)}>
          <option value="USDC">USDC</option>
          <option value="SOL">SOL</option>
        </select>
      </div>
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
         
