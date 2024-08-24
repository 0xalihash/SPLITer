let web3;
let contract;
let accounts = [];

// Chain configuration
const chainConfig = {
    chainId: '0xa045c', // Ensure this matches the actual chain ID in decimal
    rpcTarget: "https://rpc.open-campus-codex.gelato.digital",
    contractAddress: "0x314e902796802e9bcb6616c134b49a50ff9290c4",
    abi: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PaymentSent",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "recipient",
                    "type": "address"
                }
            ],
            "name": "sendAmount",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable[]",
                    "name": "recipients",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "sendWithAmount",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable[]",
                    "name": "recipients",
                    "type": "address[]"
                }
            ],
            "name": "splitAmount",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
};

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                alert('No Ethereum accounts found. Please check MetaMask.');
                return;
            }
            document.getElementById('walletInfo').innerText = `Connected as: ${accounts[0]}`;
            contract = new web3.eth.Contract(chainConfig.abi, chainConfig.contractAddress);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet.');
        }
    } else {
        alert('Please install MetaMask or another Ethereum provider.');
    }
}

document.getElementById('connectWallet').addEventListener('click', initWeb3);

document.getElementById('splitAmountForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const addresses = Array.from(document.querySelectorAll('#recipientsContainer .recipient-address')).map(input => input.value);
    const amount = web3.utils.toWei(document.getElementById('splitAmount').value, 'ether');
    if (addresses.length === 0) {
        alert('Please add at least one recipient address.');
        return;
    }
    try {
        if (accounts.length === 0) {
            alert('No Ethereum accounts found. Please connect your wallet.');
            return;
        }
        await contract.methods.splitAmount(addresses).send({ from: accounts[0], value: amount });
        alert('Amount split successfully!');
    } catch (error) {
        console.error(error);
        alert('Transaction failed.');
    }
});

document.getElementById('sendWithAmountForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const addresses = Array.from(document.querySelectorAll('#amountsContainer .recipient-address')).map(input => input.value);
    const amounts = Array.from(document.querySelectorAll('#amountsContainer .amount')).map(input => web3.utils.toWei(input.value, 'ether'));

    // Calculate the total amount
    const totalAmount = amounts.reduce((acc, amount) => acc + parseFloat(web3.utils.fromWei(amount, 'ether')), 0);
    
    if (addresses.length === 0) {
        alert('Please add at least one recipient address.');
        return;
    }

    try {
        if (accounts.length === 0) {
            alert('No Ethereum accounts found. Please connect your wallet.');
            return;
        }
        await contract.methods.sendWithAmount(addresses, amounts).send({ from: accounts[0], value: web3.utils.toWei(totalAmount.toString(), 'ether') });
        alert('Payments sent with specified amounts!');
    } catch (error) {
        console.error(error);
        alert('Transaction failed.');
    }
});

function addRow() {
    const container = document.getElementById('recipientsContainer');
    const newRow = document.createElement('div');
    newRow.className = 'address-row';
    newRow.innerHTML = `
        <input type="text" class="recipient-address" placeholder="0x..." required>
        <button type="button" class="remove-row-btn" onclick="removeRow(this)"><i class="fas fa-trash-alt"></i></button>
    `;
    container.appendChild(newRow);
}

function addRowWithAmount() {
    const container = document.getElementById('amountsContainer');
    const newRow = document.createElement('div');
    newRow.className = 'amountsContainer-cell';
    newRow.innerHTML = `
        <div class="address-col">
            <input type="text" class="recipient-address" placeholder="0x..." required>
        </div>
        <div class="amount-col">
            <input type="number" class="amount" step="0.01" required>
        </div>
        <button type="button"  class="remove-row-btn" onclick="removeRow(this)"><i class="fas fa-trash-alt"></i></button>
    `;
    container.appendChild(newRow);
}

function removeRow(button) {
    button.parentElement.remove();
}
