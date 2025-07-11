import React, { useState, useEffect } from 'react';
import { getBalance } from '../services/wallet';

const Wallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance();
      setBalance(balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>WALLET</h2>
      <p>BALANCE: {balance}</p>
    </div>
  );
};

export default Wallet;
