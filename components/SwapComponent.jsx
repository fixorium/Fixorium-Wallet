 'use client';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { JupiterApiClient } from '@jup-ag/api';
import { connection, FEE_RECIPIENT, FEE_BPS } from '../utils/solana';

const jupiter = new JupiterApiClient('https://quote-api.jup.ag', 'H4qKn8FMFha8jJuj8xMryMqRhH3h7GjLuxw7TVixpump');

export default function SwapComponent() {
  const wallet = useWallet();
  const [routes, setRoutes] = useState([]);
  const [inputMint, setInputMint] = useState('So11111111111111111111111111111111111111112'); // SOL
  const [outputMint, setOutputMint] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (wallet.publicKey && inputMint && outputMint && amount) {
      jupiter
        .quoteGet({
          inputMint,
          outputMint,
          amount: Number(amount) * 1e9,
          slippageBps: 50,
          feeBps: FEE_BPS,
          feeAccount: FEE_RECIPIENT.toBase58(),
        })
        .then(res => setRoutes(res.data || []));
    }
  }, [wallet.publicKey, inputMint, outputMint, amount]);

  const handleSwap = async () => {
    if (!wallet.publicKey || !routes.length) return alert('No route available');
    const route = routes[0];

    const { swapTransaction } = await jupiter.swapPost({
      route,
      userPublicKey: wallet.publicKey,
    });

    const txn = Buffer.from(swapTransaction, 'base64');
    const txid = await wallet.sendTransaction(txn, connection);
    await connection.confirmTransaction(txid);
    alert(`Swap successful: ${txid}`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Swap with Jupiter</h2>
      <input
        placeholder="Output Token Mint"
        value={outputMint}
        onChange={e => setOutputMint(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        placeholder="Amount in SOL"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <button onClick={handleSwap} className="bg-blue-600 text-white p-2 rounded">
        Swap
      </button>
    </div>
  );
}
