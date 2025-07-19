 <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>FIXORIUM Swap System</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <!-- Solana Wallet Adapters (browser CDN) -->
  <script src="https://cdn.jsdelivr.net/npm/@solana/wallet-adapter-wallets@0.21.0/lib/index.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@solana/wallet-adapter-base@0.21.0/lib/index.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@solana/web3.js@1.92.1/lib/index.iife.min.js"></script>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background: #181A20;
      min-height: 100vh;
      padding-bottom: 64px;
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

    .swap-input,
    select {
      width: 100%;
      padding: 6px 10px;
      border-radius: 4px;
      border: none;
      background: #31363F;
      color: #fff;
      margin: 6px 0 14px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .swap-btn {
      background: #29D6B6;
      color: #23272F;
      font-weight: bold;
      padding: 10px 0;
      width: 100%;
      border: none;
      border-radius: 6px;
      margin-top: 10px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .swap-btn:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    .balances-list {
      color: #fff;
      margin-top: 20px;
      font-size: 14px;
      line-height: 1.5;
      min-height: 50px;
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
        opacity: .3;
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
        opacity: .3;
      }

      100% {
        opacity: 1;
      }
    }

    .copy-btn {
      color: #29D6B6;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 12px;
      padding: 0 6px;
      text-decoration: underline;
    }

    .disconnect-btn {
      color: #F73E3E;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 12px;
      padding: 0 6px;
      text-decoration: underline;
    }

    a.swap-link {
      color: #29d6b6;
      text-decoration: underline;
      word-break: break-word;
      font-size: 13px;
    }

    @media (max-width: 480px) {
      .swap-card {
        width: 90%;
        padding: 24px 16px;
      }

      .wallet-section {
        justify-content: center;
        min-width: auto;
      }

      .signal-bot {
        font-size: 14px;
        gap: 12px;
        padding: 12px 4px;
      }

      .signal {
        font-size: 14px;
        gap: 4px;
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
        <input id="swapAmount" name="swapAmount" class="swap-input"
          type="number" min="0" step="any" placeholder="Enter amount" aria-required="true" />

        <div id="swapRatio" style="color:#ccc; font-size: 14px; min-height:18px; margin-bottom:8px;"></div>

        <button id="swapBtn" class="swap-btn" disabled aria-live="polite" aria-busy="false" type="submit">Swap</button>

        <div id="swapStatus" role="status" aria-live="polite" style="color:#29D6B6;margin-top:12px;"></div>
      </form>
      <div class="balances-list" id="balancesList" aria-label="Wallet balances"></div>
    </section>
  </main>

  <div class="signal-bot" id="signalBot" aria-label="Market signals"></div>

  <script>
    const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

    const MEME_TOKEN_MINTS = [
      'So11111111111111111111111111111111111111112', // SOL native
      'DezXAZ8z7PnrnRJjz3wXBoRhwTLdMPkqhuBczetogeoK', // BONK
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBtUk6goG7zcX3New'  // WIF (example)
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
    let balances = {};
    let connected = false;
    const persistKey = "fixorium_connected_wallet";

    const shortenAddress = addr => addr.slice(0, 4) + "..." + addr.slice(-4);

    function renderWalletSection() {
      const el = document.getElementById("walletSection");
      el.innerHTML = "";
      if (connected && publicKey) {
        el.innerHTML = `
          <span aria-label="Connected wallet address" title="${publicKey}" style="color:#fff;font-size:14px;">
            ${shortenAddress(publicKey)}
          </span>
          <button class="copy-btn" aria-label="Copy wallet address" onclick="copyToClipboard('${publicKey}')">Copy</button>
          <button class="disconnect-btn" aria-label="Disconnect wallet" onclick="disconnectWallet()">Disconnect</button>
        `;
      } else {
        el.innerHTML = `
          <button id="connectPhantom" class="swap-btn" type="button" style="width:auto;padding:6px 16px;font-size:14px;">Connect Phantom</button>
        `;
        document.getElementById("connectPhantom").onclick = () => connectWallet("phantom");
      }
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => alert("Wallet address copied!"));
    }

    async function connectWallet(type) {
      try {
        if (type === "phantom" && window.solana?.isPhantom) {
          const resp = await window.solana.connect();
          wallet = window.solana;
          publicKey = resp.publicKey.toString();
        } else {
          alert(`${type} wallet not installed!`);
          return;
        }

        connected = true;
        localStorage.setItem(persistKey, JSON.stringify({ publicKey }));

        renderWalletSection();
        await fetchBalances();
        renderSwapForm();

        wallet.on("disconnect", () => disconnectWallet());
      }
      catch (e) {
        alert("Wallet connection failed: " + (e.message || e));
      }
    }

    function disconnectWallet() {
      if (wallet) {
        wallet.disconnect();
      }
      connected = false;
      publicKey = null;
      wallet = null;
      balances = {};
      localStorage.removeItem(persistKey);

      renderWalletSection();
      renderSwapForm();
      document.getElementById("balancesList").innerHTML = "";
      document.getElementById("swapStatus").textContent = "";
      document.getElementById("swapRatio").textContent = "";
    }

    window.addEventListener("DOMContentLoaded", async () => {
      const saved = localStorage.getItem(persistKey);
      if (saved) {
        try {
          const savedObj = JSON.parse(saved);
          if (savedObj.publicKey && window.solana?.isPhantom) {
            await connectWallet("phantom");
          }
        } catch { }
      }
      renderWalletSection();
      renderSignalBot();
    });

    async function fetchBalances() {
      if (!connected || !publicKey) return;
      const conn = new solanaWeb3.Connection(SOLANA_RPC, "confirmed");

      balances = {};
      try {
        const ownerPk = new solanaWeb3.PublicKey(publicKey);

        let solBalance = await retry(async () => await conn.getBalance(ownerPk), 3, 300);
        balances["SOL"] = solBalance / solanaWeb3.LAMPORTS_PER_SOL;

        for (const mint of MEME_TOKEN_MINTS) {
          if (mint === "So11111111111111111111111111111111111111112") continue;
          let mintPk = new solanaWeb3.PublicKey(mint);

          let tokenAccounts = await retry(
            async () => await conn.getParsedTokenAccountsByOwner(ownerPk, { mint: mintPk }),
            3,
            300
          );

          let bal = 0;
          if (tokenAccounts.value.length > 0) {
            bal = tokenAccounts.value.reduce((acc, item) => {
              const tokenAmount = item.account.data.parsed.info.tokenAmount;
              return acc + (tokenAmount.uiAmount || 0);
            }, 0);
          }
          balances[MEME_TOKEN_NAMES[mint] || mint.slice(0, 6)] = bal;
        }
      } catch (err) {
        console.warn("Failed to fetch balances:", err);
      }

      const balanceItems = Object.entries(balances)
        .map(([sym, bal]) => `<li><b>${sym}</b>: ${bal.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 9 })}</li>`)
        .join("");
      document.getElementById("balancesList").innerHTML = `<ul>${balanceItems}</ul>`;
    }

    async function retry(fn, times, delay) {
      let err;
      for (let i = 0; i < times; i++) {
        try {
          return await fn();
        } catch (e) {
          err = e;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      throw err;
    }

    function renderSwapForm() {
      const fromSel = document.getElementById("fromToken");
      const toSel = document.getElementById("toToken");

      fromSel.innerHTML = "";
      toSel.innerHTML = "";

      MEME_TOKEN_MINTS.forEach(mint => {
        const name = MEME_TOKEN_NAMES[mint] || mint.slice(0, 6);
        fromSel.appendChild(new Option(name, mint));
        toSel.appendChild(new Option(name, mint));
      });
      fromSel.value = MEME_TOKEN_MINTS[0];
      toSel.value = MEME_TOKEN_MINTS[1];

      const swapBtn = document.getElementById("swapBtn");
      swapBtn.disabled = !(connected && publicKey);

      swapBtn.onclick = handleSwap;
      document.getElementById('swapAmount').oninput = updateSwapRatio;
      fromSel.onchange = updateSwapRatio;
      toSel.onchange = updateSwapRatio;
    }

    let lastQuoteRequest = null;

    async function updateSwapRatio() {
      const fromMint = document.getElementById("fromToken").value;
      const toMint = document.getElementById("toToken").value;
      const amountString = document.getElementById("swapAmount").value;
      const ratioEl = document.getElementById("swapRatio");
      ratioEl.textContent = '';

      const amount = parseFloat(amountString);
      if (!amount || amount <= 0) return;
      if (fromMint === toMint) {
        ratioEl.textContent = "From and To tokens cannot be the same.";
        return;
      }

      const requestKey = `${fromMint}_${toMint}_${amount}`;
      lastQuoteRequest = requestKey;

      try {
        const amountInBaseUnits = Math.floor(amount * 1e9);
        const res = await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amountInBaseUnits}&slippageBps=50`
        );
        if (lastQuoteRequest !== requestKey) return;
        const data = await res.json();
        if (!data.routes || data.routes.length === 0) {
          ratioEl.textContent = "No swap route found.";
          return;
        }
        const outAmountUi = data.routes[0].outAmountUI;
        const rate = outAmountUi / amount;
        ratioEl.textContent = `Estimated rate: 1 ${MEME_TOKEN_NAMES[fromMint] || fromMint} ≈ ${rate.toFixed(6)} ${MEME_TOKEN_NAMES[toMint] || toMint}`;
      } catch (e) {
        ratioEl.textContent = "Failed to fetch swap rate.";
      }
    }

    async function handleSwap() {
      if (!connected || !publicKey) {
        alert("Please connect your Phantom wallet.");
        return;
      }
      const fromMint = document.getElementById("fromToken").value;
      const toMint = document.getElementById("toToken").value;
      const amountInput = document.getElementById("swapAmount").value;
      const statusEl = document.getElementById("swapStatus");
      statusEl.textContent = "";

      const amount = parseFloat(amountInput);
      if (!amount || amount <= 0) {
        alert("Enter a valid swap amount.");
        return;
      }
      if (fromMint === toMint) {
        alert("Swap tokens must be different.");
        return;
      }

      statusEl.textContent = "Fetching best route...";

      const amountInBaseUnits = Math.floor(amount * 1e9);

      try {
        const quoteRes = await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amountInBaseUnits}&slippageBps=50`
        );
        const quote = await quoteRes.json();

        if (!quote.routes || quote.routes.length === 0) {
          statusEl.textContent = "No swap route found.";
          return;
        }

        const bestRoute = quote.routes[0];

        statusEl.textContent = "Building swap transaction...";

        const swapRes = await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            route: bestRoute,
            userPublicKey: publicKey,
            wrapAndUnwrapSol: true,
          }),
        });

        const swapTx = await swapRes.json();

        if (!swapTx.swapTransaction) {
          statusEl.textContent = "Failed to build swap transaction.";
          return;
        }

        statusEl.textContent = "Signing and sending transaction...";

        const txBase64 = swapTx.swapTransaction;
        const txBuffer = Uint8Array.from(atob(txBase64), (c) => c.charCodeAt(0));
        const tx = solanaWeb3.Transaction.from(txBuffer);

        let sendResult = await wallet.signAndSendTransaction(tx);
        const signature = sendResult.signature || sendResult;

        statusEl.innerHTML = `Swap transaction sent! <a class="swap-link" href="https://solscan.io/tx/${signature}" target="_blank" rel="noopener noreferrer">View on Solscan</a>`;

        await fetchBalances();

      } catch (err) {
        statusEl.textContent = "Error during swap: " + (err.message || err);
      }
    }

    function renderSignalBot() {
      const smallTokens = SIGNAL_BOT_SMALL_TOKENS;
      const signalBot = document.getElementById("signalBot");

      function randomSignal() {
        return Math.random() > 0.5 ? "BUY" : "SELL";
      }

      function updateSignals() {
        signalBot.innerHTML = smallTokens
          .map(tok => {
            const sig = randomSignal();
            return `<div class="signal signal-small" aria-live="polite">
              <span aria-label="Token">${tok}</span>
              <span class="signal-${sig.toLowerCase()}" aria-label="${sig} signal">${sig}</span>
            </div>`;
          })
          .join("");
      }

      updateSignals();
      setInterval(updateSignals, 2000);
    }
  </script>
</body>

</html>
