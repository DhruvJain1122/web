import web3 from './web3';

const address = '0x665ab45170f873d6ae9cFec43d04998e3BC7200c';
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "destination",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "transferId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "traderAddress",
				"type": "address"
			}
		],
		"name": "completeTransfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "destination",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "transferId",
						"type": "uint256"
					}
				],
				"internalType": "struct Destination.TransferData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "successfulTransfer",
		"outputs": [
			{
				"internalType": "address",
				"name": "destination",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "transferId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
 
export default new web3.eth.Contract(abi, address);

