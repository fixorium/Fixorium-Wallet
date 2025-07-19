 <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>FIXORIUM Swap System</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <!-- Solana web3.js (exposes solanaWeb3 global) -->
  <script src="https://cdn.jsdelivr.net/npm/@solana/web3.js@1.92.1/lib/index.iife.min.js"></script>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background: #181A20;
      min-height: 100vh;
      padding-bottom: 64px;
      color: white;
    }

    .fixorium-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background: #23272F;
      flex-wrap: wrap;
      gap: 12px;
    }

    .fixorium-logo {
      height: 36px;
      width: 36px;
      margin-right: 10px;
    }

    .fixorium-title {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      white-space: nowrap;
    }

    .wallet-section {
      background: #31363F;
      border-radius: 6px;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      min-width: 225px;
      font-size: 14px;
    }

    button {
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-weight: bold;
      cursor: pointer;
    }

    .wallet-connect-btn {
      background-color: #29d6b6;
      color: #23272f;
    }

    .wallet-disconnect-btn {
      background-color: #f73e3e;
      color: white;
    }

    .swap-card {
      background: #23272F;
      margin: 32px auto;
      border-radius: 16px;
      box-shadow: 0 8px 24px #0003;
      padding: 32px 24px;
      width: 100%;
      max-width: 450px;
      box-sizing: border-box;
    }

    .swap-label {
      color: #fff;
      font-weight: bold;
      margin-top: 10px;
      display: block;
      font-size: 14px;
    }

    select,
    input.swap-input {
      width: 100%;
      padding: 6px 10px;
      margin: 6px 0 14px;
      font-size: 14px;
      border-radius: 4px;
      border: none;
      background: #31363F;
      color: white;
      box-sizing: border-box;
    }

    button.swap-btn {
      width: 100%;
      font-size: 16px;
      padding: 10px 0;
      margin-top: 10px;
      background-color: #29d6b6;
      color: #23272f;
      font-weight: bold;
      cursor: pointer;
      border-radius: 6px;
      border: none;
      transition: background-color 0.3s;
    }

    button.swap-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    #swapRatio {
      color: #ccc;
      font-size: 14px;
      min-height: 18px;
      margin-bottom: 8px;
    }

    #balancesList {
      margin-top: 20px;
      font-size: 14px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .signal-bot {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #23272F;
      padding: 16px 0;
      display: flex;
      justify-content: center;
      border-top: 1px solid #23272F;
      z-index: 1000;
      gap: 24px;
      user-select: none;
      flex-wrap: wrap;
      font-size: 18px;
      color: #fff;
    }

    .signal {
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }

    .signal-buy {
      color: #29D6B6;
      font-weight: 700;
      animation: blinkBuy 1s linear infinite;
    }

    .signal-sell {
      color: #F73E3E;
      font-weight: 700;
      animation: blinkSell 1s linear infinite;
    }

    .signal-small {
      font-size: 10px;
      opacity: 0.6;
      user-select: none;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    @keyframes blinkBuy {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.3;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes blinkSell {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.3;
      }

      100% {
        opacity: 1;
      }
    }
  </style>
</head>

<body>
  <div class="fixorium-header">
    <div style="display:flex;align-items:center;">
      <svg class="fixorium-logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <circle cx="32" cy="32" r="32" fill="#29D6B6" />
        <text x="32" y="42" text-anchor="middle" font-size="28" fill="#23272F" font-family="Arial" font-weight="bold">F</text>
      </svg>
      <span class="fixorium-title">FIXORIUM</span>
    </div>
    <div id="walletSection" class="wallet-section" aria-live="polite" aria-label="Wallet connection status"></div>
  </div>
  <main>
    <section class="swap-card" role="main" aria-label="Token swap interface">
      <form id="swapForm" onsubmit="return false" aria-describedby="swapStatus">
        <label for="fromToken" class="swap-label">From Token</label>
        <select id="fromToken" name="fromToken" aria-required="true" aria-describedby="fromTokenDesc"></select>

        <label for="toToken" class="swap-label">To Token</label>
        <select id="toToken" name="toToken" aria-required="true" aria-describedby="toTokenDesc"></select>

        <label for="swapAmount" class="swap-label">Amount</label>
        <input id="swapAmount" name="swapAmount" class="swap-input" type="number" min="0" step="any" placeholder="Enter amount"
          aria-required="true" />

        <div id="swapRatio"></div>

        <button id="swapBtn" class="swap-btn" disabled aria-live="polite" aria-busy="false" type="submit">Swap</button>

        <div id="swapStatus" role="status" aria-live="polite" style="color:#29D6B6; margin-top:12px;"></div>
      </form>
      <div id="balancesList" aria-label="Wallet balances"></div>
    </section>
  </main>
  <div id="signalBot" class="signal-bot" aria-label="Market signals"></div>

  <script>
    // Required Solana web3 is exposed globally as solanaWeb3 because of external script tag
    // Phantom wallet uses window.solana

    const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

    const MEME_TOKEN_MINTS = [
      'So11111111111111111111111111111111111111112',
      'DezXAZ8z7PnrnRJjz3wXBoRhwTLdMPkqhuBczetogeoK',
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBtUk6goG7zcX3New'
    ];

    const MEME_TOKEN_NAMES = {
      'So11111111111111111111111111111111111111112': 'SOL',
      'DezXAZ8z7PnrnRJjz3wXBoRhwTLdMPkqhuBczetogeoK': 'BONK',
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
      'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBtUk6goG7zcX3New': 'WIF'
    };

    const SIGNAL_BOT_SMALL_TOKENS = ["BTC", "SOL", "FIXERCOIN"];

    let wallet = null;
    let publicKey = null;
    let connected = false;
    let balances = {};

    const persistKey = "fixorium_connected_wallet";

    const shortenAddress = addr => addr.slice(0, 4) + "..." + addr.slice(-4);

    // Render wallet section UI
    function renderWalletSection() {
      const el = document.getElementById('walletSection');
      el.innerHTML = '';
      if (connected && publicKey) {
        el.innerHTML = `
          <span aria-label="Connected wallet address" title="${publicKey}" style="color:#fff;font-size:14px;">${shortenAddress(publicKey)}</span>
          <button class="wallet-disconnect-btn" id="disconnectBtn" aria-label="Disconnect wallet">Disconnect</button>
          <button class="copy-btn" aria-label="Copy wallet address">Copy</button>
        `;
        document.getElementById('disconnectBtn').onclick = disconnectWallet;
        el.querySelector('.copy-btn').onclick = () => {
          navigator.clipboard.writeText(publicKey).then(() => alert('Wallet address copied!'));
        };
      } else {
        el.innerHTML = `<button class="wallet-connect-btn" id="connectBtn">Connect Phantom</button>`;
        document.getElementById('connectBtn').onclick = connectWallet;
      }
    }

    async function connectWallet() {
      try {
        if (!window.solana || !window.solana.isPhantom) {
          alert('Phantom Wallet not detected! Please install or enable Phantom wallet extension.');
          return;
        }
        const resp = await window.solana.connect();
        wallet = window.solana;
        publicKey = resp.publicKey.toString();
        connected = true;

        localStorage.setItem(persistKey, publicKey);

        wallet.on("disconnect", () => {
          disconnectWallet();
        });

        renderWalletSection();
        await fetchBalances();
        setupSwapForm();
      } catch (e) {
        alert('Wallet connection failed: ' + (e.message || e));
      }
    }

    function disconnectWallet() {
      if (wallet) {
        wallet.disconnect();
      }
      connected = false;
      wallet = null;
      publicKey = null;
      balances = {};
      localStorage.removeItem(persistKey);

      renderWalletSection();
      setupSwapForm();
      document.getElementById('balancesList').innerHTML = '';
      document.getElementById('swapStatus').textContent = '';
      document.getElementById('swapRatio').textContent = '';
    }

    // On page load, auto reconnect if phantom is connected
    window.addEventListener('DOMContentLoaded', async () => {
      const savedPk = localStorage.getItem(persistKey);
      if (savedPk && window.solana?.isPhantom) {
        try {
          await connectWallet();
        } catch {
          localStorage.removeItem(persistKey);
        }
      } else {
        renderWalletSection();
        setupSwapForm();
      }
      renderSignalBot();
    });

    async function fetchBalances() {
      if (!connected || !publicKey) return;
      const conn = new solanaWeb3.Connection(SOLANA_RPC, 'confirmed');
      balances = {};

      try {
        const ownerPk = new solanaWeb3.PublicKey(publicKey);
        const solBalance = await conn.getBalance(ownerPk);
        balances.SOL = solBalance / solanaWeb3.LAMPORTS_PER_SOL;

        for (const mint of MEME_TOKEN_MINTS) {
          if (mint === 'So11111111111111111111111111111111111111112') continue;

          const mintPubKey = new solanaWeb3.PublicKey(mint);
          const tokenAccounts = await conn.getParsedTokenAccountsByOwner(ownerPk, { mint: mintPubKey });
          let amount = 0;
          if (tokenAccounts.value.length) {
            amount = tokenAccounts.value.reduce((acc, tokenAccount) => {
              return acc + (tokenAccount.account.data.parsed.info.tokenAmount.uiAmount || 0);
            }, 0);
          }
          balances[MEME_TOKEN_NAMES[mint] || mint.slice(0, 6)] = amount;
        }
      } catch (e) {
        console.warn('Failed to fetch balances:', e);
      }
      renderBalances();
    }

    function renderBalances() {
      const balancesEl = document.getElementById('balancesList');
      const html = Object.entries(balances)
        .map(([symbol, amount]) => `<li><b>${symbol}:</b> ${amount.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 9 })}</li>`)
        .join('');
      balancesEl.innerHTML = `<ul>${html}</ul>`;
    }

    function setupSwapForm() {
      const fromToken = document.getElementById('fromToken');
      const toToken = document.getElementById('toToken');
      fromToken.innerHTML = '';
      toToken.innerHTML = '';
      MEME_TOKEN_MINTS.forEach(mint => {
        const name = MEME_TOKEN_NAMES[mint] || mint.slice(0, 6);
        fromToken.appendChild(new Option(name, mint));
        toToken.appendChild(new Option(name, mint));
      });
      fromToken.value = MEME_TOKEN_MINTS[0];
      toToken.value = MEME_TOKEN_MINTS[1];

      const swapBtn = document.getElementById('swapBtn');
      swapBtn.disabled = !connected;

      swapBtn.onclick = handleSwap;
      document.getElementById('swapAmount').oninput = updateSwapRatio;
      fromToken.onchange = updateSwapRatio;
      toToken.onchange = updateSwapRatio;
    }

    let lastQuoteRequest = null;

    async function updateSwapRatio() {
      const fromMint = document.getElementById('fromToken').value;
      const toMint = document.getElementById('toToken').value;
      const amountInput = document.getElementById('swapAmount').value;
      const swapRatioEl = document.getElementById('swapRatio');

      swapRatioEl.textContent = '';
      if (!amountInput || parseFloat(amountInput) <= 0) return;
      if (fromMint === toMint) {
        swapRatioEl.textContent = 'From and To tokens cannot be the same.';
        return;
      }

      const amount = parseFloat(amountInput);
      const requestKey = `${fromMint}_${toMint}_${amount}`;
      lastQuoteRequest = requestKey;

      try {
        const inputAmount = Math.floor(amount * 1e9);
        const response = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${inputAmount}&slippageBps=50`);
        if (lastQuoteRequest !== requestKey) return;
        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
          swapRatioEl.textContent = 'No swap route found.';
          return;
        }
        const outputAmount = data.routes[0].outAmountUI;
        const rate = outputAmount / amount;
        swapRatioEl.textContent = `Estimated rate: 1 ${MEME_TOKEN_NAMES[fromMint] || fromMint} ≈ ${rate.toFixed(6)} ${MEME_TOKEN_NAMES[toMint] || toMint}`;
      } catch (e) {
        swapRatioEl.textContent = 'Failed to fetch swap rate.';
      }
    }

    async function handleSwap() {
      if (!connected || !publicKey) {
        alert("Please connect your Phantom wallet.");
        return;
      }

      const fromMint = document.getElementById('fromToken').value;
      const toMint = document.getElementById('toToken').value;
      const amountInput = document.getElementById('swapAmount').value;
      const statusEl = document.getElementById('swapStatus');

      if (!amountInput || parseFloat(amountInput) <= 0) {
        alert('Enter a valid swap amount.');
        return;
      }
      if (fromMint === toMint) {
        alert('Swap tokens must be different.');
        return;
      }

      statusEl.textContent = 'Fetching best route...';

      try {
        const inputAmount = Math.floor(parseFloat(amountInput) * 1e9);
        let response = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${inputAmount}&slippageBps=50`);
        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
          statusEl.textContent = 'No swap route found.';
          return;
        }

        const bestRoute = data.routes[0];

        statusEl.textContent = 'Building swap transaction...';

        response = await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            route: bestRoute,
            userPublicKey: publicKey,
            wrapAndUnwrapSol: true,
          })
        });

        const swapTx = await response.json();

        if (!swapTx.swapTransaction) {
          statusEl.textContent = 'Failed to build swap transaction.';
          return;
        }

        statusEl.textContent = 'Signing and sending transaction...';

        const txBytes = Uint8Array.from(atob(swapTx.swapTransaction), c => c.charCodeAt(0));
        const transaction = solanaWeb3.Transaction.from(txBytes);

        const { signature } = await wallet.signAndSendTransaction(transaction);

        statusEl.innerHTML = `Swap transaction sent! <a href="https://solscan.io/tx/${signature}" target="_blank" rel="noopener noreferrer">View on Solscan</a>`;

        await fetchBalances();
      } catch (err) {
        statusEl.textContent = 'Error during swap: ' + (err.message || err);
      }
    }

    function renderSignalBot() {
      const smallTokens = SIGNAL_BOT_SMALL_TOKENS;
      const signalBot = document.getElementById('signalBot');

      function randomSignal() {
        return Math.random() > 0.5 ? 'BUY' : 'SELL';
      }

      function updateSignals() {
        signalBot.innerHTML = smallTokens
          .map(token => {
            const sig = randomSignal();
            return `<div class="signal signal-small" aria-live="polite">
              <span aria-label="Token">${token}</span> 
              <span class="signal-${sig.toLowerCase()}" aria-label="${sig} signal">${sig}</span>
            </div>`;
          })
          .join('');
      }

      updateSignals();
      setInterval(updateSignals, 2000);
    }
  </script>
</body>

</html>
