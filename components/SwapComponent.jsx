 import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { Jupiter, RouteInfo } from "@jup-ag/api";
import {
  connection,
  WRAPPED_SOL_MINT,
  USDC_MINT,
  FIXERCOIN_MINT
} from "../lib/solana";

export default function SwapComponent({ walletAddress }) {
  const [jupiter, setJupiter] = useState(null);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!walletAddress) return;
    (async () => {
      const jup = await Jupiter.load({
        connection,
        cluster: "mainnet-beta",
        userPublicKey: new PublicKey(walletAddress),
        routeCacheDuration: 0
      });
      setJupiter(jup);
    })();
  }, [walletAddress]);

  useEffect(() => {
    if (!jupiter || !amount) return;
    (async () => {
      const routes = await jupiter.computeRoutes({
        inputMint: WRAPPED_SOL_MINT,
        outputMint: USDC_MINT, // or FIXERCOIN_MINT
        amount: Math.floor(amount * 1e9),
        slippageBps: 50
      });
      setQuote(routes.routesInfos[0] || null);
    })();
  }, [jupiter, amount]);

  const handleSwap = async () => {
    if (!jupiter || !quote) return;
    const feeBps = 10; // 0.10%
    const inAmt = quote.inAmount / 1e9;
    const fee = (inAmt * feeBps) / 10000;
    const reducedAmt = inAmt - fee;

    const bestRoute = await jupiter.computeRoutes({
      ...quote,
      amount: Math.floor(reducedAmt * 1e9)
    });

    const { execute } = await jupiter.exchange({ routeInfo: bestRoute.routesInfos[0] });
    const txid = await execute();
    alert(`Swap done—TXID: ${txid}`);
  };

  return !walletAddress ? null : (
    <div style={{ marginTop: 20, padding: 16, border:"1px solid #ccc", borderRadius:8 }}>
      <h3>Swap SOL → USDC</h3>
      <input
        type="number"
        placeholder="Amount SOL"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <button disabled={!quote} onClick={handleSwap} style={{ marginTop: 8 }}>
        Swap {amount} SOL
      </button>
      {quote && (
        <p>
          You’ll receive ~{(quote.outAmount / 1e6).toFixed(4)} tokens (~0.10% fee applied)
        </p>
      )}
    </div>
  );
}
