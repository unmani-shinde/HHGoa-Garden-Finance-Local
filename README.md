# Garden Finance SDK for Multi-Chain Real Estate Asset Tokenization Platform 🌸💲

The Garden SDK addresses a key challenge for Bitcoin holders who are traditionally unable to participate in standard dApp transactions. A compelling use case being developed is a Multi-Chain Real Estate Asset Tokenization Platform. This platform enables users to represent real estate assets, such as houses or bungalows, as non-fungible tokens (NFTs) across multiple blockchains, including the Core DAO Testnet and Ethereum Sepolia Testnet.

## Key Features

- **Multi-Chain NFTs:** Represent real estate assets as NFTs across various blockchains, providing a versatile platform for asset tokenization.
- **Fractional Ownership and Auctions:** The platform supports fractional ownership of real estate NFTs and auction-based transactions, making it accessible and flexible for various user needs.
- **Bitcoin Integration:** Bitcoin holders can participate by swapping their BTC for WBTC on the Ethereum Sepolia Testnet, allowing them to engage in NFT minting and other platform features.

## Localnet Setup ⚙️

### Prerequisites:

Make sure you have the following technologies installed:

- [Docker](https://docs.docker.com/engine/install/)
- [Node.js](https://nodejs.org/en/download/package-manager)
- [Node Package Manager (NPM)](https://www.npmjs.com/)
- [MetaMask Wallet](https://metamask.io/download.html) for your browser.
- For Windows Users, [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install)

### PART 1: Merry Installation:

- Merry is a CLI tool leverages Docker to effortlessly set up a multi-chain testing environment in a single command. Merry includes Bitcoin regtest node, Ethereum localnet node, and essential Catalog services(Filler and Orderbook), providing a self-contained space to test your applications independently of external services. Click [here](https://docs.garden.finance/developers/merry/) to view the documentation.

  - **STEP 1**: For (Windows Users): Run the following command to start the Windows Subystem for Linux (WSL). The next commands must be executed in the same terminal as this.
      ```bash
            wsl
      ```
  - **STEP 2**: Run the following command to install Merry:
      ```bash
            curl https://get.merry.dev | bash
      ```
  - **STEP 3**: Make sure the installation was successful by running the command:
      ```bash
            merry go --headless
      ```
      This will start the Merry CLI and now you can use it's [commands](https://docs.garden.finance/developers/merry/merry-cmds)
    
  - **STEP 4**: Fund your Ethereum Localnet Wallet with ETH and wBTC by running the command:
    
      ```bash
          merry faucet --to <YOUR_EVM_ADDRESS>
      ```
      NOTE: This same command can be used to fund your Bitcoin Wallet Address in Localnet as well, by replacing `<YOUR_EVM_ADDRESS>` by your Bitcoin Wallet Address. This will be seen in the next part of the setup.

### PART 2: Setup and Run the DAPP:

1. In a separate terminal, clone the repository and navigate to the `client` folder, which contains the source code.
   
   ```bash
   git clone https://github.com/unmani-shinde/HHGoa-Garden-Finance-Local
   cd HHGoa-Garden-Finance-Local\client
   ```
2. Install the dependencies by running:
   ```bash
   npm install
   ```
5. Start the dAPP by running:
   ```bash
   npm run dev
    ```
The dAPP will then request to connect to Ethereum Localnet if not already connected.

## How to Use

NOTE: This setup uses the EVM Signer to create a compatible Bitcoin Wallet. Therefore, once you have connected your EVM Wallet to the application, the corresponding Bitcoin Address is generated.

### Swapping BTC to WBTC

1. Connect your Wallet via Wagmi
2. Navigate to the "Create My First Token" section.
3. You should be able to see the sender Bitcoin Address with a wallet balance of zero. As stated in Part 1 of the installation, now you should fund this Bitcoin Address by running the same Merry command but with your Bitcoin Address instead.   
4. Directly swap your BTC for WBTC and mint your first real estate NFT.

### Swapping WBTC to BTC

1. Go to the "Get My BTC" section.
2. Connect to the Garden setup. Since we funded the EVM Wallet in the first part of the installation itself, there is no need to repeat that step here.
4. Directly swap your WBTC back to BTC.

This platform opens up new possibilities for Bitcoin holders, enabling them to participate fully in the burgeoning NFT and real estate tokenization markets.

## TechStack
- Setup for: **Bitcoin Regression Test Network** & **Ethereum Localnet** Orderbook Pair
- Frontend: Vite + React, TailwindCSS
- Wallet Integration: Wagmi + ConnectKit
- BTC <-> wBTC OrderPair Swap: [Garden Finance SDK Documentation](https://docs.garden.finance/developers/sdk/)
