import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Jupiter } from '@jup-ag/core';

const connection = new Connection('https:                                
const jupiter = new Jupiter(connection);

const SwapComponent = () => {
  const [inputToken, setInputToken] = useState('SOL');
  const [outputToken, setOutputToken] = useState('USDC');
  const [amount, setAmount] = useState(0);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const quoteResponse = await jupiter.quote({
          amount: amount * 10 ** 9,                       
          inputMint: new PublicKey(inputToken === 'SOL' ? 'So11111111111111111111111111111111111111112' : inputToken),
          outputMint: new PublicKey(outputToken === 'USDC' ? 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' : outputToken),
          slippageBps: 100,               
        });
        setQuote(quoteResponse);
      } catch (error) {
        console.error(error);
      }
    };
    getQuote();
  }, [amount, inputToken, outputToken]);

  const handleSwap = async () => {
    try {
      const swapResponse = await jupiter.swap({
        quoteResponse: quote,
        userPublicKey: new PublicKey('YOUR_WALLET_PUBLIC_KEY'),
      });
      console.log(swapResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={inputToken} onChange={(e) => setInputToken(e.target.value)}>
        <option value="SOL">SOL</option>
        <option value="USDC">USDC</option>
      </select>
      <select value={outputToken} onChange={(e) => setOutputToken(e.target.value)}>
        <option value="USDC">USDC</option>
        <option value="SOL">SOL</option>
      </select>
      <button onClick={handleSwap}>Swap</button>
      {quote && (
        <p>
          You will receive {quote.outAmount / 10 ** 6} {outputToken}
        </p>
      )}
    </div>
  );
};

export default SwapComponent;
