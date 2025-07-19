 import { useState } from "react";

const SOL_MINT = "So11111111111111111111111111111111111111112"; // Native SOL wrapped token

const presetTokens = [
  {
    name: "Dogecoin (wDOGE)",
    mint: "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgMQg85NVh9Z"
  },
  {
    name: "Bonk",
    mint: "So11111111111111111111111111111111111111112"
  },
  {
    name: "Samoyedcoin",
    mint: "3WnvAX9TvMuBFhVZxrTZp4XqF6Yp3JeCvM6DtrrCUn8d"
  }
];

export default function SwapComponent({ walletAddress }) {
  const [selectedMint, setSelectedMint] = useState(presetTokens[0].mint);
  const [amount, setAmount] = useState("");

  const handleSwap = () => {
    if (!walletAddress) return alert("Please connect your wallet first.");
    alert(
      `Swap initiated (mock): ${amount} SOL to ${selectedMint}\nFrom: ${walletAddress}`
    );
    // Real swap logic using Jupiter or your backend would go here
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
      <h3>Swap SOL to Meme Tokens (Devnet)</h3>
      <select
        value={selectedMint}
        onChange={(e) => setSelectedMint(e.target.value)}
        style={{ padding: "6px", width: "100%", marginBottom: "1rem" }}
      >
        {presetTokens.map((token) => (
          <option key={token.mint} value={token.mint}>
            {token.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "6px", width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={handleSwap} style={{ padding: "10px", width: "100%" }}>
        Swap
      </button>
    </div>
  );
}
