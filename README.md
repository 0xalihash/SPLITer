# SPLITer - Gas-Efficient Multi-Payment DApp

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/solidity-%5E0.8.0-lightgrey)

## Introduction

**SPLITer** is a decentralized application (DApp) designed to optimize gas fees when sending payments to multiple recipients on the EDU blockchain. By batching payments into a single transaction, SPLITer significantly reduces the overall gas cost, making it a more efficient way to distribute funds.

## Features

- **Split Equally**: Send a specified amount of EDU tokens to multiple recipients, equally splitting the total amount.
- **Split Specifically**: Allocate specific amounts to each recipient in a single transaction.
- **Wallet Integration**: Connect your wallet (e.g., MetaMask) directly through the DApp for seamless transactions.


## Technologies Used

- **Solidity**: Smart contracts developed using Solidity, handling the logic for splitting and sending payments.
- **Remix**: Used for developing and testing the smart contracts.
- **Web3.js**: Integrated to interact with the blockchain.
- **JavaScript/HTML/CSS**: Frontend development for a responsive and interactive user interface.

## Smart Contract Details

- **Chain**: EDU Chain
- **Contract Address**: `0x314e902796802e9bcb6616c134b49a50ff9290c4`
- **ABI**: The ABI (Application Binary Interface) is included in the project for easy interaction with the contract.

## Gas Optimization Techniques

1. **Batch Processing**: Multiple payments are batched into a single transaction to reduce gas costs.
2. **Unchecked Blocks**: Optimized loops using `unchecked` to avoid unnecessary gas costs from overflow checks.
3. **Efficient Event Emission**: Only essential events are emitted, reducing additional gas costs.
4. **Minimal Contract Size**: The contract is designed to be concise, minimizing deployment and execution costs.

## Installation

To run this project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/spliter.git
    cd spliter
    ```

2. **Install dependencies**:
    - Ensure you have MetaMask or another Ethereum wallet installed.
    - No additional dependencies are required; the project uses CDN links for Web3.js and Font Awesome.

3. **Run the DApp**:
    - Open `index.html` in your browser.
    - Connect your wallet and start interacting with the DApp.

## Usage

1. **Connect Your Wallet**: Click the "Connect" button to link your Ethereum wallet.
2. **Split Equally**: 
   - Enter the total amount of EDU tokens.
   - Add recipient addresses and click "Split".
3. **Split Specifically**: 
   - Enter recipient addresses and specific amounts for each.
   - Click "Send" to execute the transaction.

## Contribution

Contributions are welcome! Please fork this repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
