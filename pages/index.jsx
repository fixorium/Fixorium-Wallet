 import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

import { createJupiterApiClient } from "@jup-ag/api";


import { useEffect, useState } from "react";
import { getSolanaConnection, TOKEN_PROGRAM_ID } from "../lib/solana";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import SwapComponent from "../components/SwapComponent";
import Image from "next/image";

const FIXORIUM_MINT = new PublicKey("FiXo111111111111111111111111111111111111111");

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [solBalance, setSolBalance] = useState(0);
  const [fixoriumBalance, setFixoriumBalance] = useState(0);

  const connection = getSolanaConnection();

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        fetchBalances(response.publicKey);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        setWalletAddress(null);
        setSolBalance(0);
        setFixoriumBalance(0);
      }
    } catch (err) {
      console.error("Disconnect failed:", err);
    }
  };

  const fetchBalances = async (pubkey) => {
    try {
      const balance = await connection.getBalance(pubkey);
      setSolBalance(balance / LAMPORTS_PER_SOL);

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID
      });

      let fixorium = 0;
      tokenAccounts.value.forEach(({ account }) => {
        const info = account.data.parsed.info;
        if (info.mint === FIXORIUM_MINT.toString()) {
          fixorium = parseFloat(info.tokenAmount.uiAmountString);
        }
      });

      setFixoriumBalance(fixorium);
    } catch (err) {
      console.error("Balance fetch failed:", err);
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        try {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          fetchBalances(response.publicKey);
        } catch (err) {
          console.warn("Not auto-connected:", err);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <Image src="/fixorium-logo.png" alt="Fixorium Logo" width={120} height={120} />
      <h1>Fixorium Wallet</h1>

      {!walletAddress ? (
        <button onClick={connectWallet} style={{ padding: "10px 20px" }}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p>
            <strong>Connected Wallet:</strong> <code>{walletAddress}</code>
          </p>
          <p>
            <strong>SOL Balance:</strong> {solBalance.toFixed(4)} SOL
          </p>
          <p>
            <strong>Fixorium Balance:</strong> {fixoriumBalance.toFixed(2)} FIXO
          </p>
          <button
            onClick={disconnectWallet}
            style={{ padding: "8px 18px", background: "#f44", color: "white" }}
          >
            Disconnect
          </button>
        </>
      )}

      <section style={{ marginTop: "2rem" }}>
        <SwapComponent walletAddress={walletAddress} />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Supported SOL Meme Tokens (Devnet)</h2>
        <ul>
          <li>Dogecoin (wDOGE) - <code>Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgMQg85NVh9Z</code></li>
          <li>Bonk - <code>So11111111111111111111111111111111111111112</code></li>
          <li>Samoyedcoin - <code>3WnvAX9TvMuBFhVZxrTZp4XqF6Yp3JeCvM6DtrrCUn8d</code></li>
        </ul>
      </section>
    </main>
  );
   }
   

