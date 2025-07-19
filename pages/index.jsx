 import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import SwapComponent from "../components/SwapComponent";
import { connection, TOKEN_PROGRAM_ID, FIXERCOIN_MINT } from "../lib/solana";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [solBalance, setSolBalance] = useState(0);
  const [fixerBalance, setFixerBalance] = useState(0);

  const connectWallet = async () => {
    if (window.solana?.isPhantom) {
      try {
        const resp = await window.solana.connect();
        setWalletAddress(resp.publicKey.toString());
      } catch {}
    } else alert("Phantom wallet not found");
  };

  const disconnectWallet = async () => {
    await window.solana?.disconnect();
    setWalletAddress(null);
    setSolBalance(0);
    setFixerBalance(0);
  };

  useEffect(() => {
    if (!walletAddress) return;

    (async () => {
      const pubkey = new PublicKey(walletAddress);
      const sol = await connection.getBalance(pubkey);
      setSolBalance(sol / 1e9);

      const accounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID
      });

      const fixerAcc = accounts.value.find(a =>
        a.account.data.parsed.info.mint === FIXERCOIN_MINT.toString()
      );

      setFixerBalance(
        fixerAcc
          ? parseFloat(fixerAcc.account.data.parsed.info.tokenAmount.uiAmountString)
          : 0
      );
    })();
  }, [walletAddress]);

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ flexGrow: 1 }}>Fixorium Wallet</h1>
        <Image src="/fixorium-logo.png" alt="Logo" width={40} height={40}/>
      </div>

      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Phantom</button>
      ) : (
        <>
          <p><strong>Wallet:</strong> {walletAddress}</p>
          <p><strong>SOL:</strong> {solBalance.toFixed(4)}</p>
          <p><strong>Fixercoin:</strong> {fixerBalance.toFixed(2)}</p>
          <button onClick={disconnectWallet} style={{ background:"#f44", color:"#fff" }}>Disconnect</button>

          <SwapComponent walletAddress={walletAddress} />
        </>
      )}
    </main>
  );
}
