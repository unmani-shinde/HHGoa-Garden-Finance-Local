import { useEffect, useState } from "react";
import { useMetaMaskStore, useGarden, useSignStore } from "./store";
import { Assets } from "@gardenfi/orderbook";
import React from "react";
import { useAccount } from "wagmi";

type AmountState = {
  btcAmount: string | null;
  wbtcAmount: string | null;
};

const ReverseSwapComponent: React.FC = () => {
  const [amount, setAmount] = useState<AmountState>({
    btcAmount: null,
    wbtcAmount: null,
  });

  const changeAmount = (of: "BTC" | "WBTC", value: string) => {
    if (of === "BTC") {
      handleBTCChange(value);
    }
  };

  const handleBTCChange = (value: string) => {
    const newAmount: AmountState = { btcAmount: value, wbtcAmount: null };
    if (Number(value) > 0) {
      const wbtcAmount = (Number(value) * (1 - 0.3 / 100));
      newAmount.wbtcAmount = wbtcAmount.toFixed(8).toString();
    }
    setAmount(newAmount);
  };

  return (
    <div className="swap-component">
      <WalletConnect />
      <hr></hr>
      <SwapAmount amount={amount} changeAmount={changeAmount} />
      <hr></hr>
      <Swap amount={amount} changeAmount={changeAmount} />
    </div>
  );
};

const WalletConnect: React.FC = () => {
  const { connectMetaMask, metaMaskIsConnected } = useMetaMaskStore();

  return (
    <div className="swap-component-top-section">
      <span className="swap-title">Swap</span>
      <MetaMaskButton
        isConnected={metaMaskIsConnected}
        onClick={connectMetaMask}
      />
    </div>
  );
};

type MetaMaskButtonProps = {
  isConnected: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isConnected,
  onClick,
}) => {
  const buttonClass = `connect-metamask button-${
    isConnected ? "black" : "white"
  }`;
  const buttonText = isConnected ? "Connected" : "Connect Metamask";

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

type TransactionAmountComponentProps = {
  amount: AmountState;
  changeAmount: (of: "BTC" | "WBTC", value: string) => void;
};

const SwapAmount: React.FC<TransactionAmountComponentProps> = ({
  amount,
  changeAmount,
}) => {
  const { btcAmount, wbtcAmount } = amount;

  return (
    <div className="swap-component-middle-section">
      <InputField
        id="btc"
        label="Send BTC"
        value={btcAmount}
        onChange={(value) => changeAmount("BTC", value)}
      />
      <InputField id="wbtc" label="Receive WBTC" value={wbtcAmount} readOnly />
    </div>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string | null;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  readOnly,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div className="input-component">
      <input
        id={id}
        placeholder="0"
        value={value || ""}
        type="number"
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button>{id.toUpperCase()}</button>
    </div>
  </div>
);

type SwapAndAddressComponentProps = {
  amount: AmountState;
  changeAmount: (of: "BTC" | "WBTC", value: string) => void;
};

const Swap: React.FC<SwapAndAddressComponentProps> = ({
  amount,
  changeAmount,
}) => {
  const { garden, bitcoin } = useGarden();
  const [btcAddress, setBtcAddress] = useState<string>();
  const { metaMaskIsConnected } = useMetaMaskStore();
  const { btcAmount, wbtcAmount } = amount;
  const account = useAccount();

  const { isSigned } = useSignStore();

  useEffect(() => {
    if (!bitcoin) return;
    const getAddress = async () => {
      if (isSigned) {
        const address = await bitcoin.getAddress();
        setBtcAddress(address);
      }
    };
    getAddress();
  }, [bitcoin, isSigned]);

  const handleSwap = async () => {
    if (
      !garden ||
      typeof Number(btcAmount) !== "number" ||
      typeof Number(wbtcAmount) !== "number"
    )
      return;

    const sendAmount = Number(btcAmount) * 1e8; // Convert to satoshis
    const receiveAmount = Number(wbtcAmount) * 1e8; // Convert to satoshis

    changeAmount("BTC", "");

    await garden.swap(
      Assets.bitcoin_regtest.BTC,
      Assets.ethereum_localnet.WBTC,
      sendAmount,
      receiveAmount
    );
  };

  return (
    <div className="swap-component-bottom-section">
      <div>
        <label htmlFor="receive-address">Receive address</label>
        <div className="input-component">
          <input
            id="receive-address"
            placeholder="Enter WBTC Address"
            value={account.address || ""}
            readOnly
          />
        </div>
      </div>
      <button
        className={`button-${metaMaskIsConnected ? "white" : "black"}`}
        onClick={handleSwap}
        disabled={!metaMaskIsConnected}
      >
        Swap
      </button>
    </div>
  );
};

export default ReverseSwapComponent;
