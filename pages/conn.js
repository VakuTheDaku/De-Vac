const contractABI = require("./Contract.json");
const YOUR_CONTRACT_ADDRESS = "0xaecCA6116AdfeBB56e587164BB0A199a244a0dd7";
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