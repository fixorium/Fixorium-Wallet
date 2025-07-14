 // app.js
(() => {
  const e = React.createElement;
  const { useState, useEffect, useCallback } = React;
  const {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    TransactionInstruction,
    SYSVAR_RENT_PUBKEY,
  } = solanaWeb3;
  const BN = window.BN;

  // Constants
  const connection = new Connection("https://solana-api.projectserum.com", "confirmed");
  const JUPITER_API_BASE = "https://quote-api.jup.ag/v4";
  const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvR1HuTRHqpPDp7HHTRmAg3zRk6USH3UUZsM");
  const SOL_MINT = "So11111111111111111111111111111111111111112";

  // Tokens List (SOL + popular + FIXERCOIN, replace FIXER mint as needed)
  const tokensList = [
    {
      mint: null,
      symbol: "SOL",
      name: "Solana",
      decimals: 9,
      logoURI: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=014",
    },
    {
      mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=014",
    },
    {
      mint: new PublicKey("Es9vMFrzaCER7N1TvjVqauDziYbPEmxW5M9VpX1TTd8C"),
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014",
    },
    {
      mint: new PublicKey("D2mGkp5D43jirFeapx8UZmpiH7FaWeX1eUWy94q1F2hD"), // Example FIXERCOIN mint
      symbol: "FIXR",
      name: "FixerCoin",
      decimals: 9,
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/D2mGkp5D43jirFeapx8UZmpiH7FaWeX1eUWy94q1F2hD/logo.png",
    },
  ];

  // Utility: Find Associated Token Account address
  async function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
    return (
      await PublicKey.findProgramAddress(
        [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    )[0];
  }

  // Utility: Convert amount string to base units integer
  function toBaseUnits(amountStr, decimals) {
    try {
      const val = parseFloat(amountStr);
      if (isNaN(val) || val <= 0) return 0;
      return Math.round(val * 10 ** decimals);
    } catch {
      return 0;
    }
  }

  // Token logo helper component
  function TokenLogo({ token }) {
    if (token.logoURI)
      return e("img", { src: token.logoURI, alt: token.symbol, className: "token-logo" });
    return e(
      "div",
      {
        className: "token-logo",
        style: {
          backgroundColor: "#ccc",
          fontWeight: "bold",
          fontSize: 14,
          textAlign: "center",
          lineHeight: "28px",
          borderRadius: 6,
          userSelect: "none",
        },
        title: token.name,
      },
      token.symbol
    );
  }

  function App() {
    // Wallet state
    const [provider, setProvider] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);
    const [publicKey, setPublicKey] = useState(null);

    // Balances
    const [balances, setBalances] = useState({});

    // Withdraw SPL token form state
    const [splWithdrawTokenSymbol, setSplWithdrawTokenSymbol] = useState("FIXR");
    const [splWithdrawAddress, setSplWithdrawAddress] = useState("");
    const [splWithdrawAmount, setSplWithdrawAmount] = useState("");

    // Withdraw SOL form state
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    // Swap form state
    const [fromToken, setFromToken] = useState(tokensList[0]);
    const [toToken, setToToken] = useState(tokensList[3]);
    const [swapAmount, setSwapAmount] = useState("");
    const [slippage, setSlippage] = useState("0.5");

    // Swap results & status
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    // UI status flags & messages
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [loadingQuotes, setLoadingQuotes] = useState(false);
    const [swapping, setSwapping] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false);

    // Detect phantom wallet on mount
    useEffect(() => {
      const p = (() => {
        if (window.solana && window.solana.isPhantom) return window.solana;
        if (window.phantom && window.phantom.solana && window.phantom.solana.isPhantom)
          return window.phantom.solana;
        else return null;
      })();
      setProvider(p);
    }, []);

    // Connect wallet handler
    const connectWallet = useCallback(async () => {
      setError("");
      if (!provider) {
        setError("Phantom Wallet not found. Please install Phantom.");
        return;
      }
      try {
        const resp = await provider.connect();
        setPublicKey(new PublicKey(resp.publicKey.toString()));
        setWalletConnected(true);
        setError("");
        setStatus("");
      } catch {
        setError("Wallet connection rejected or failed.");
      }
    }, [provider]);

    // Disconnect handler
    const disconnectWallet = async () => {
      if (!provider) return;
      try {
        await provider.disconnect();
      } catch { }
      setWalletConnected(false);
      setPublicKey(null);
      setBalances({});
      setRoutes([]);
      setSelectedRoute(null);
      setStatus("");
      setError("");
      setSwapAmount("");
      setWithdrawAmount("");
      setWithdrawAddress("");
      setSplWithdrawAmount("");
      setSplWithdrawAddress("");
    };

    // Listen wallet events
    useEffect(() => {
      if (!provider) return;
      const onConnect = (pk) => {
        setPublicKey(new PublicKey(pk.toString()));
        setWalletConnected(true);
        setError("");
        setStatus("");
      };
      const onDisconnect = () => {
        setWalletConnected(false);
        setPublicKey(null);
        setBalances({});
        setRoutes([]);
        setSelectedRoute(null);
        setError("");
        setStatus("");
        setSwapAmount("");
        setWithdrawAmount("");
        setWithdrawAddress("");
        setSplWithdrawAmount("");
        setSplWithdrawAddress("");
      };
      provider.on("connect", onConnect);
      provider.on("disconnect", onDisconnect);

      if (provider.isConnected) onConnect(provider.publicKey);

      return () => {
        provider.removeListener && provider.removeListener("connect", onConnect);
        provider.removeListener && provider.removeListener("disconnect", onDisconnect);
      };
    }, [provider]);

    // Fetch balances on wallet connect or update
    useEffect(() => {
      if (!walletConnected || !publicKey) {
        setBalances({});
        return;
      }
      async function fetchBalances() {
        setError("");
        try {
          const solLamports = await connection.getBalance(publicKey);
          const newBalances = { SOL: solLamports / 1e9 };

          // SPL tokens balances
          await Promise.all(tokensList.map(async (t) => {
            if (!t.mint) return; // skip SOL
            try {
              const ata = await findAssociatedTokenAddress(publicKey, t.mint);
              const info = await connection.getParsedAccountInfo(ata);
              const bal =
                info.value &&
                info.value.data &&
                info.value.data.parsed &&
                info.value.data.parsed.info &&
                info.value.data.parsed.info.tokenAmount
                  ? info.value.data.parsed.info.tokenAmount.uiAmount
                  : 0;
              newBalances[t.symbol] = bal;
            } catch {
              newBalances[t.symbol] = 0;
            }
          }));
          setBalances(newBalances);
        } catch (err) {
          setError("Failed loading balances.");
          console.error(err);
        }
      }
      fetchBalances();
    }, [walletConnected, publicKey]);

    // Swap from/to tokens
    const swapTokens = () => {
      const oldFrom = fromToken;
      setFromToken(toToken);
      setToToken(oldFrom);
      setSwapAmount("");
      setRoutes([]);
      setSelectedRoute(null);
      setError("");
      setStatus("");
    };

    // Fetch swap routes
    const getSwapQuotes = async () => {
      setError("");
      setStatus("");
      setRoutes([]);
      setSelectedRoute(null);

      if (!walletConnected || !publicKey || !provider) {
        setError("Wallet not connected.");
        return;
      }
      if (!swapAmount || isNaN(parseFloat(swapAmount)) || parseFloat(swapAmount) <= 0) {
        setError("Enter a valid swap amount.");
        return;
      }
      if (fromToken.symbol === toToken.symbol) {
        setError("From and To tokens must be different.");
        return;
      }
      setLoadingQuotes(true);

      try {
        const inputMint = fromToken.symbol === "SOL" ? SOL_MINT : fromToken.mint.toBase58();
        const outputMint = toToken.symbol === "SOL" ? SOL_MINT : toToken.mint.toBase58();

        const amountInBaseUnits = toBaseUnits(swapAmount, fromToken.decimals);
        if (amountInBaseUnits === 0) {
          setError("Amount too small after decimal conversion.");
          setLoadingQuotes(false);
          return;
        }

        const res = await axios.get(`${JUPITER_API_BASE}/quote`, {
          params: {
            inputMint,
            outputMint,
            amount: amountInBaseUnits,
            slippageBps: Math.round(parseFloat(slippage) * 100),
            swapMode: "ExactIn",
          },
          timeout: 15000,
        });

        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setRoutes(res.data.data);
          setSelectedRoute(res.data.data[0]);
          setError("");
        } else {
          setError("No swap routes found.");
        }
      } catch (err) {
        setError("Failed to fetch swap quotes.");
        console.error(err);
      }

      setLoadingQuotes(false);
    };

    // Execute swap transaction
    const executeSwap = async () => {
      setError("");
      setStatus("");
      if (!selectedRoute) {
        setError("Select a swap route first.");
        return;
      }
      if (!walletConnected || !publicKey || !provider) {
        setError("Wallet not connected.");
        return;
      }
      setSwapping(true);

      try {
        const resp = await axios.post(
          `${JUPITER_API_BASE}/swap`,
          {
            route: selectedRoute,
            userPublicKey: publicKey.toBase58(),
          },
          { timeout: 15000 }
        );

        if (!resp.data || !resp.data.swapTransactions) {
          setError("Failed to get swap transactions.");
          setSwapping(false);
          return;
        }

        const { setupTransaction, swapTransaction } = resp.data.swapTransactions;

        if (setupTransaction) {
          const tx = Transaction.from(Buffer.from(setupTransaction, "base64"));
          tx.feePayer = publicKey;
          const blockhash = (await connection.getLatestBlockhash()).blockhash;
          tx.recentBlockhash = blockhash;
          const signed = await provider.signTransaction(tx);
          const txid = await connection.sendRawTransaction(signed.serialize());
          setStatus(`Setup transaction sent: ${txid}`);
          await connection.confirmTransaction(txid);
        }

        const swapTx = Transaction.from(Buffer.from(swapTransaction, "base64"));
        swapTx.feePayer = publicKey;
        const blockhash2 = (await connection.getLatestBlockhash()).blockhash;
        swapTx.recentBlockhash = blockhash2;
        const signedSwap = await provider.signTransaction(swapTx);
        const swapTxid = await connection.sendRawTransaction(signedSwap.serialize());
        setStatus(`Swap transaction sent: ${swapTxid}`);
        await connection.confirmTransaction(swapTxid);
        setStatus(`Swap confirmed: ${swapTxid}`);

        // Refresh balances after swap
        const solBalanceLamports = await connection.getBalance(publicKey);
        const newBalances = { SOL: solBalanceLamports / 1e9 };
        for (const t of tokensList) {
          if (!t.mint) continue;
          try {
            const ata = await findAssociatedTokenAddress(publicKey, t.mint);
            const info = await connection.getParsedAccountInfo(ata);
            newBalances[t.symbol] =
              info.value?.data?.parsed?.info?.tokenAmount?.uiAmount || 0;
          } catch {
            newBalances[t.symbol] = 0;
          }
        }
        setBalances(newBalances);

        setSwapAmount("");
        setRoutes([]);
        setSelectedRoute(null);
        setError("");
      } catch (err) {
        setError(`Swap failed: ${err.message || err.toString()}`);
        console.error(err);
      }
      setSwapping(false);
    };

    // Withdraw SOL function
    const withdrawSol = async () => {
      setError("");
      setStatus("");
      if (!walletConnected || !publicKey || !provider) {
        setError("Wallet not connected.");
        return;
      }
      if (!withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
        setError("Enter valid withdraw amount.");
        return;
      }

      const val = parseFloat(withdrawAmount);

      if (val > (balances.SOL || 0)) {
        setError("Withdraw amount exceeds SOL balance.");
        return;
      }

      let destKey;
      try {
        destKey = new PublicKey(withdrawAddress);
      } catch {
        setError("Invalid withdrawal recipient address.");
        return;
      }

      setWithdrawing(true);

      try {
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: destKey,
            lamports: Math.round(val * 1e9),
          })
        );
        tx.feePayer = publicKey;
        const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        tx.recentBlockhash = recentBlockhash;

        const signedTx = await provider.signTransaction(tx);
        const txid = await connection.sendRawTransaction(signedTx.serialize());

        setStatus(`Withdraw transaction sent: ${txid}`);
        await connection.confirmTransaction(txid);
        setStatus(`Withdraw confirmed: ${txid}`);

        // Refresh balance
        const solBalanceLamports = await connection.getBalance(publicKey);
        setBalances(b => ({ ...b, SOL: solBalanceLamports / 1e9 }));

        setWithdrawAmount("");
        setWithdrawAddress("");
      } catch (err) {
        setError("Withdraw failed: " + (err.message || err.toString()));
      }
      setWithdrawing(false);
    };

    // Withdraw SPL Token function
    const withdrawSPLToken = async () => {
      setError("");
      setStatus("");
      if (!walletConnected || !publicKey || !provider) {
        setError("Wallet not connected.");
        return;
      }
      if (!splWithdrawAmount || isNaN(parseFloat(splWithdrawAmount)) || parseFloat(splWithdrawAmount) <= 0) {
        setError("Enter valid token withdraw amount.");
        return;
      }
      if (!splWithdrawAddress) {
        setError("Enter recipient address.");
        return;
      }

      let recipientPubkey;
      try {
        recipientPubkey = new PublicKey(splWithdrawAddress);
      } catch {
        setError("Invalid recipient address.");
        return;
      }

      const amount = parseFloat(splWithdrawAmount);
      const tokenData = tokensList.find((t) => t.symbol === splWithdrawTokenSymbol);
      if (!tokenData || !tokenData.mint) {
        setError("Invalid token selected for withdrawal.");
        return;
      }
      const decimals = tokenData.decimals || 0;

      if ((balances[tokenData.symbol] || 0) < amount) {
        setError(`Insufficient ${tokenData.symbol} balance.`);
        return;
      }

      setWithdrawing(true);
      try {
        // Find ATAs
        const senderATA = await findAssociatedTokenAddress(publicKey, tokenData.mint);
        const recipientATA = await findAssociatedTokenAddress(recipientPubkey, tokenData.mint);

        const recipientAccountInfo = await connection.getAccountInfo(recipientATA);
        const instructions = [];

        if (recipientAccountInfo === null) {
          // Instruction to create recipient ATA
          const createATAIx = new TransactionInstruction({
            keys: [
              { pubkey: publicKey, isSigner: true, isWritable: true },
              { pubkey: recipientATA, isSigner: false, isWritable: true },
              { pubkey: recipientPubkey, isSigner: false, isWritable: false },
              { pubkey: tokenData.mint, isSigner: false, isWritable: false },
              { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            ],
            programId: ASSOCIATED_TOKEN_PROGRAM_ID,
            data: Buffer.from([]),
          });
          instructions.push(createATAIx);
        }

        // Create token transfer instruction data (3 + 8 bytes amount LE)
        const amountBN = new BN(Math.round(amount * 10 ** decimals));
        const data = Buffer.alloc(9);
        data.writeUInt8(3, 0); // Transfer instruction index
        amountBN.toArrayLike(Buffer, "le", 8).copy(data, 1);

        const transferIx = new TransactionInstruction({
          keys: [
            { pubkey: senderATA, isSigner: false, isWritable: true },
            { pubkey: recipientATA, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
          ],
          programId: TOKEN_PROGRAM_ID,
          data: data,
        });

        instructions.push(transferIx);

        const tx = new Transaction().add(...instructions);
        tx.feePayer = publicKey;
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;

        const signedTx = await provider.signTransaction(tx);
        const txid = await connection.sendRawTransaction(signedTx.serialize());

        setStatus(`SPL Token withdraw transaction sent: ${txid}`);

        await connection.confirmTransaction(txid);
        setStatus(`SPL Token withdraw transaction confirmed: ${txid}`);

        // Refresh balances
        const newBalances = { ...balances };
        newBalances[tokenData.symbol] -= amount;
        setBalances(newBalances);

        setSplWithdrawAmount("");
        setSplWithdrawAddress("");
      } catch (err) {
        setError("SPL Token withdraw failed: " + (err.message || err.toString()));
        console.error(err);
      }
      setWithdrawing(false);
    };

    return e(
      "div",
      null,

      !walletConnected &&
        e(
          "button",
          {
            onClick: connectWallet,
            style: { width: "100%", padding: 14, fontSize: "1.15rem" },
            type: "button",
            "aria-label": "Connect Phantom Wallet",
          },
          "Connect Phantom Wallet"
        ),

      walletConnected &&
        e(
          React.Fragment,
          null,

          e(
            "p",
            {
              style: {
                userSelect: "text",
                fontWeight: 600,
                wordBreak: "break-word",
              },
            },
            "Connected Wallet: ",
            publicKey.toBase58()
          ),

          e(
            "button",
            {
              onClick: disconnectWallet,
              style: { width: "100%", padding: 12, marginBottom: 16 },
              type: "button",
            },
            "Disconnect Wallet"
          ),

          e(
            "fieldset",
            null,
            e("legend", null, "Balances"),
            e(
              "div",
              { className: "balances-row" },
              tokensList.map((t) =>
                e(
                  "div",
                  { key: t.symbol, className: "balance-item", title: t.name },
                  e(TokenLogo, { token: t }),
                  `${t.symbol}: ${
                    balances[t.symbol] === undefined
                      ? "Loading..."
                      : balances[t.symbol].toFixed(t.decimals)
                  }`
                )
              )
            )
          ),

          e(
            "fieldset",
            null,
            e("legend", null, "Deposit"),
            e(
              "p",
              null,
              "Send tokens to your address below to deposit:",
              e("br"),
              e(
                "code",
                { style: { wordBreak: "break-word", userSelect: "text" } },
                publicKey.toBase58()
              )
            )
          ),

          // Withdraw SOL
          e(
            "fieldset",
            null,
            e("legend", null, "Withdraw SOL"),
            e("label", { htmlFor: "withdrawAddress" }, "Recipient Wallet Address"),
            e("input", {
              id: "withdrawAddress",
              type: "text",
              placeholder: "Enter recipient public key",
              value: withdrawAddress,
              onChange: (e) => setWithdrawAddress(e.target.value),
              spellCheck: false,
              autoComplete: "off",
            }),
            e(
              "label",
              { htmlFor: "withdrawAmount" },
              `Amount SOL (max: ${
                balances.SOL ? balances.SOL.toFixed(6) : "..."
              })`
            ),
            e("input", {
              id: "withdrawAmount",
              type: "number",
              min: "0",
              step: "any",
              value: withdrawAmount,
              onChange: (e) => setWithdrawAmount(e.target.value),
              placeholder: "0",
            }),
            e(
              "button",
              {
                type: "button",
                onClick: withdrawSol,
                disabled: withdrawing || !withdrawAmount || !withdrawAddress,
              },
              withdrawing ? "Withdrawing..." : "Withdraw SOL"
            )
          ),

          // Withdraw SPL Token
          e(
            "fieldset",
            null,
            e("legend", null, "Withdraw SPL Token"),
            e("label", { htmlFor: "splWithdrawToken" }, "Select Token"),
            e(
              "select",
              {
                id: "splWithdrawToken",
                value: splWithdrawTokenSymbol,
                onChange: (e) => setSplWithdrawTokenSymbol(e.target.value),
              },
              tokensList
                .filter((t) => t.mint != null)
                .map((t) => e("option", { key: t.symbol, value: t.symbol }, t.symbol))
            ),
            e("label", { htmlFor: "splWithdrawAddress" }, "Recipient Address"),
            e("input", {
              type: "text",
              id: "splWithdrawAddress",
              placeholder: "Recipient public key",
              value: splWithdrawAddress,
              onChange: (e) => setSplWithdrawAddress(e.target.value),
              spellCheck: false,
              autoComplete: "off",
            }),
            e(
              "label",
              { htmlFor: "splWithdrawAmount" },
              `Amount (max: ${
                balances[splWithdrawTokenSymbol]
                  ? balances[splWithdrawTokenSymbol].toFixed(6)
                  : "..."
              })`
            ),
            e("input", {
              type: "number",
              step: "any",
              min: "0",
              id: "splWithdrawAmount",
              placeholder: "0",
              value: splWithdrawAmount,
              onChange: (e) => setSplWithdrawAmount(e.target.value),
            }),
            e(
              "button",
              {
                type: "button",
                onClick: withdrawSPLToken,
                disabled:
                  withdrawing || !splWithdrawAmount || !splWithdrawAddress,
              },
              withdrawing ? "Withdrawing..." : "Withdraw SPL Token"
            )
          ),

          // Swap Section
          e(
            "fieldset",
            null,
            e("legend", null, "Swap Tokens"),
            e(
              "div",
              { className: "swap-container" },
              e(
                "div",
                { className: "swap-select" },
                e("label", { htmlFor: "fromToken" }, "From"),
                e(
                  "select",
                  {
                    id: "fromToken",
                    value: fromToken.symbol,
                    onChange: (e) => {
                      const sym = e.target.value;
                      const sel = tokensList.find((t) => t.symbol === sym);
                      if (sel) setFromToken(sel);
                      setRoutes([]);
                      setSelectedRoute(null);
                      setSwapAmount("");
                      setError("");
                      setStatus("");
                    },
                  },
                  tokensList.map((t) =>
                    e("option", { key: t.symbol, value: t.symbol }, t.symbol)
                  )
                )
              ),
              e(
                "button",
                {
                  className: "swap-button",
                  onClick: () => {
                    const old = fromToken;
                    setFromToken(toToken);
                    setToToken(old);
                    setSwapAmount("");
                    setRoutes([]);
                    setSelectedRoute(null);
                    setError("");
                    setStatus("");
                  },
                  type: "button",
                  "aria-label": "Swap From/To Tokens",
                },
                "⇅"
              ),
              e(
                "div",
                { className: "swap-select" },
                e("label", { htmlFor: "toToken" }, "To"),
                e(
                  "select",
                  {
                    id: "toToken",
                    value: toToken.symbol,
                    onChange: (e) => {
                      const sym = e.target.value;
                      const sel = tokensList.find((t) => t.symbol === sym);
                      if (sel) setToToken(sel);
                      setRoutes([]);
                      setSelectedRoute(null);
                      setSwapAmount("");
                      setError("");
                      setStatus("");
                    },
                  },
                  tokensList.map((t) =>
                    e("option", { key: t.symbol, value: t.symbol }, t.symbol)
                  )
                )
              )
            ),
            e("label", { htmlFor: "swapAmount" }, `Amount (${fromToken.symbol}):`),
            e("input", {
              id: "swapAmount",
              type: "number",
              min: "0",
              step: "any",
              value: swapAmount,
              onChange: (e) => setSwapAmount(e.target.value),
              placeholder: "0",
            }),
            e("label", { htmlFor: "slippage" }, "Slippage tolerance (%)"),
            e("input", {
              id: "slippage",
              type: "number",
              min: "0",
              max: "10",
              step: "0.1",
              value: slippage,
              onChange: (e) => {
                let val = e.target.value;
                if (val === "") val = "0";
                let num = Math.min(Math.max(parseFloat(val), 0), 10);
                setSlippage(num.toString());
              },
              placeholder: "0.5",
            }),
            e(
              "button",
              {
                type: "button",
                onClick: getSwapQuotes,
                disabled:
                  loadingQuotes ||
                  swapping ||
                  !swapAmount ||
                  fromToken.symbol === toToken.symbol ||
                  parseFloat(swapAmount) <= 0,
                style: { marginTop: 12 },
              },
              loadingQuotes ? "Fetching swap quotes..." : "Get Swap Quotes"
            ),

            routes.length > 0 &&
              e(
                "div",
                {
                  style: {
                    marginTop: 16,
                    maxHeight: 280,
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: 12,
                    padding: 12,
                    userSelect: "none",
                  },
                },
                routes.map((route) => {
                  const outAmount = (
                    parseInt(route.outAmount) /
                    10 ** toToken.decimals
                  ).toFixed(6);
                  const priceImpact = (route.priceImpactPct * 100).toFixed(3);
                  const selected = selectedRoute && selectedRoute.id === route.id;
                  return e(
                    "div",
                    {
                      key: route.id,
                      role: "button",
                      tabIndex: 0,
                      className: "route-box" + (selected ? " selected" : ""),
                      onClick: () => setSelectedRoute(route),
                      onKeyDown: (ev) => {
                        if (ev.key === "Enter" || ev.key === " ")
                          setSelectedRoute(route);
                      },
                      style: {
                        marginBottom: 8,
                        padding: 10,
                        border: selected ? "2px solid #007aff" : "1.5px solid #bbb",
                        backgroundColor: selected ? "#d0e4ff" : "white",
                        fontWeight: selected ? 700 : 400,
                        cursor: "pointer",
                      },
                    },
                    e("div", null, e("b", null, "Expected Out: "), `${outAmount} ${toToken.symbol}`),
                    e("div", null, e("b", null, "Price Impact: "), `${priceImpact} %`)
                  );
                })
              ),
            routes.length > 0 &&
              e(
                "button",
                {
                  type: "button",
                  disabled: swapping || !selectedRoute,
                  onClick: executeSwap,
                  style: {
                    marginTop: 12,
                    width: "100%",
                    padding: 14,
                    fontWeight: "700",
                    fontSize: "1.1rem",
                  },
                },
                swapping
                  ? "Swapping..."
                  : `Swap ${swapAmount} ${fromToken.symbol} → ${toToken.symbol}`
              ),
            status && e("p", { className: "status", role: "alert" }, status),
            error && e("p", { className: "error", role: "alert" }, error)
          ),

          e(
            "footer",
            null,
            "Powered by ",
            e(
              "a",
              { href: "https://solana.com", target: "_blank", rel: "noopener noreferrer" },
              "Solana"
            ),
            ", ",
            e(
              "a",
              { href: "https://phantom.app", target: "_blank", rel: "noopener noreferrer" },
              "Phantom"
            ),
            ", and ",
            e(
              "a",
              { href: "https://jup.ag", target: "_blank", rel: "noopener noreferrer" },
              "Jupiter"
            )
          )
        )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
