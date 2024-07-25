import { type Chain } from "viem";

export const core: Chain = {
  id: 1115,
  name: "CORE",
  nativeCurrency: {
    decimals: 18,
    name: "tCORE",
    symbol: "TCORE",
  },
  rpcUrls: {
    default: { http: ["https://rpc.test.btcs.network"] },
  },
  blockExplorers: {
    default: { name: "Core Explorer", url: "https://scan.test.btcs.network/" },
  },
  testnet: true,
};

export const local: Chain = {
  id: 31337,
  name: "ethereum localnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
  },
  // blockExplorers: {
  //   default: { name: "Core Explorer", url: "https://scan.test.btcs.network/" },
  // },
  testnet: true,
};