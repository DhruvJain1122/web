import web3 from './web3';

const address = '0xb426FC7c8941b621595b0b2349fE1205D7Dba7d6';
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
						"name": "fee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "feeRampup",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "transferId",
						"type": "uint256"
					}
				],
				"internalType": "struct Source.TransferData[]",
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
				"internalType": "address",
				"name": "destination",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"name": "newTransaction",
		"outputs": [],
		"stateMutability": "payable",
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
		"name": "transactions",
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
				"name": "fee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "feeRampup",
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
	},
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
				"name": "transferId",
				"type": "uint256"
			}
		],
		"name": "transferToTrader",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
 
export default new web3.eth.Contract(abi, address);

