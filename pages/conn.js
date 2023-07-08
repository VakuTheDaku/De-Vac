const contractABI = require("./Contract.json");
const YOUR_CONTRACT_ADDRESS = "0x778344a873E2B4b9E53C7Ea2C4847bcE20Aa346c";
import { ethers } from "ethers"
const getContract = (window) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
        YOUR_CONTRACT_ADDRESS,
        contractABI,
        signer
    );
    return contract;
};

export default getContract