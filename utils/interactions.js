import { ethers } from 'ethers';

const contractAddress = '0x0fA5F551801aeD90dE8d191FEB6c2C35908f29c6';
const contractABI = require("../contract/Contract.json");

async function getProvider(window) {
  // Check if MetaMask is installed and connected
  if (typeof window !== 'undefined' && window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } else {
    throw new Error('MetaMask not detected. Please install MetaMask and connect your wallet.');
  }
}

export async function getContract(window) {
  const provider = await getProvider(window);
  // Connect to the deployed VaccineSupply contract using ethers.js
  const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
  return contract;
}

export async function getVaccineCount(hospitalAddress, window) {
  try {
    const contract = await getContract(window);
    const count = await contract.getVaccineCount(hospitalAddress);
    return count.toNumber();
  } catch (error) {
    console.error('Error getting vaccine count:', error);
    return null;
  }
}

export async function buyVaccine(hospitalAddress, amount, window) {
  try {
    const contract = await getContract(window);
    // Call the buyVaccine function in the smart contract
    const transaction = await contract.buyVaccine(hospitalAddress, amount);
    // Wait for the transaction to be mined
    await transaction.wait();
    console.log('Vaccine bought successfully!');
  } catch (error) {
    console.error('Error buying vaccine:', error);
  }
}

export async function setVaccineCount(hospitalAddress, count, window) {
  try {
    const contract = await getContract(window);
    // Call the setVaccineCount function in the smart contract
    const transaction = await contract.setVaccineCount(hospitalAddress, count);
    // Wait for the transaction to be mined
    await transaction.wait();
    console.log('Vaccine count set successfully!');
  } catch (error) {
    console.error('Error setting vaccine count:', error);
  }
}
