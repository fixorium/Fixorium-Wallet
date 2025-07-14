 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Select Wallet</title>
  <link href="https://fonts.googleapis.com/css?family=Arial:400,500,700&display=swap" rel="stylesheet">
  <style>
    body {
      background: #181824;
      color: #e3e7ed;
      font-family: Arial, sans-serif;
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .wallet-list {
      width: 90%;
      max-width: 340px;
      background: #232339;
      border-radius: 14px;
      box-shadow: 0 4px 20px rgba(60,72,88,0.18);
      padding: 1.2em 1em;
    }
    .wallet-btn {
      display: flex;
      align-items: center;
      background: #9945FF;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      padding: 0.6em 1.2em;
      margin: 0.7em 0;
      cursor: pointer;
      transition: background 0.15s;
      width: 100%;
      font-family: Arial, sans-serif;
    }
    .wallet-btn:hover { filter: brightness(1.1); }
    .wallet-btn img {
      margin-right: 0.7em;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #232339;
      background: #191923;
    }
    .info {
      color: #19FB9B;
      margin-top: 1em;
      text-align: center;
    }
  </style>
</head>
<body>
  <h2>Select Wallet</h2>
  <div class="wallet-list">
    <button class="wallet-btn" onclick="connectPhantom()">
      <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="Phantom" /> Phantom (Solana)
    </button>
    <button class="wallet-btn" onclick="connectBackpack()">
      <img src="https://pbs.twimg.com/profile_images/1732466769072377856/3U_Mu8vI_400x400.jpg" alt="Backpack" /> Backpack (Solana)
    </button>
    <button class="wallet-btn" onclick="connectMetamask()">
      <img src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png" alt="MetaMask" /> MetaMask (Ethereum)
    </button>
    <div class="info" id="info"></div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/@solana/web3.js@1.95.2/lib/index.iife.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
  <script>
    function postWallet(address, balance) {
      window.opener.postMessage({
        type: "wallet-connected",
        address,
        balance
      }, "*");
      setTimeout(() => window.close(), 800);
    }

    async function connectPhantom() {
      if (window.solana && window.solana.isPhantom) {
        try {
          const resp = await window.solana.connect();
          const address = resp.publicKey.toString();
          const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
          const balanceLamports = await connection.getBalance(new solanaWeb3.PublicKey(address));
          const balance = (balanceLamports / 1e9).toFixed(4);
          postWallet(address, balance);
        } catch (e) {
          document.getElementById("info").textContent = "Wallet connection failed!";
        }
      } else {
        document.getElementById("info").textContent = "Phantom wallet not found!";
      }
    }
    async function connectBackpack() {
      if (window.backpack) {
        try {
          const resp = await window.backpack.connect();
          const address = resp.publicKey.toString();
          const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
          const balanceLamports = await connection.getBalance(new solanaWeb3.PublicKey(address));
          const balance = (balanceLamports / 1e9).toFixed(4);
          postWallet(address, balance);
        } catch (e) {
          document.getElementById("info").textContent = "Backpack connection failed!";
        }
      } else {
        document.getElementById("info").textContent = "Backpack wallet not found!";
      }
    }
    async function connectMetamask() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const balanceWei = await provider.getBalance(address);
          const balanceEth = ethers.utils.formatEther(balanceWei);
          postWallet(address, parseFloat(balanceEth).toFixed(4));
        } catch (e) {
          document.getElementById("info").textContent = "MetaMask connection failed!";
        }
      } else {
        document.getElementById("info").textContent = "MetaMask not found!";
      }
    }
  </script>
</body>
</html>
