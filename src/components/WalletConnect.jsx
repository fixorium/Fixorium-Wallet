import { SigningStargateClient } from "@cosmjs/stargate";
import { useState } from "react";

export default function WalletConnect() {
  const [address, setAddress] = useState("");

  const connect = async () => {
    if (!window.keplr) {
      alert("Please install Keplr");
      return;
    }

    await window.keplr.enable(import.meta.env.VITE_CHAIN_ID);
    const offlineSigner = window.getOfflineSigner(import.meta.env.VITE_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    setAddress(accounts[0].address);
  };

  return (
    <div>
      <button onClick={connect}>Connect Keplr</button>
      {address && <p>Connected: {address}</p>}
    </div>
  );
}

