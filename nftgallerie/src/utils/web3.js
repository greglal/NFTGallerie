import { ethers } from 'ethers';
import { BrowserProvider, Contract } from 'ethers';

import MarketABI from '../abis/Market.json';
import EURABI from '../abis/EUR.json';
import GrendyCardABI from '../abis/GrendyCard.json';

// Connexion à Metamask (BrowserProvider)
const provider = new BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();

// Adresses des contrats
const marketAddress = "0xbdfc768f6c88b469f92435d2e30e1dab895b66d1";
const eurAddress = "0x1bc52d99fbfa70a2f7ce4f8865927e13c0793e93";
const grendyCardAddress = "0x320eb0cc902dbf6971ae8d8780eb6eb178a6d0b2";

// Contrats connectés au signer pour pouvoir envoyer des transactions
const marketContract = new Contract(marketAddress, MarketABI.abi, signer);
const eurContract = new Contract(eurAddress, EURABI.abi, signer);
const grendyCardContract = new Contract(grendyCardAddress, GrendyCardABI.abi, signer);

export { marketContract, eurContract, grendyCardContract };
