// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VaccineSupply {
    address public owner;
    mapping(address => uint256) public hospitalVaccineCount;

    event VaccineBought(address indexed buyer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setVaccineCount(address hospital, uint256 count) external onlyOwner {
        hospitalVaccineCount[hospital] = count;
    }

    function buyVaccine(uint256 amount) external {
        require(amount > 0, "You must buy at least one vaccine");
        require(hospitalVaccineCount[msg.sender] >= amount, "Not enough vaccines available");

        hospitalVaccineCount[msg.sender] -= amount;
        emit VaccineBought(msg.sender, amount);
    }

    function getVaccineCount(address hospital) external view returns (uint256) {
        return hospitalVaccineCount[hospital];
    }

    // In case the contract owner needs to withdraw any remaining vaccines
    function withdrawVaccines(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        require(hospitalVaccineCount[address(this)] >= amount, "Not enough vaccines in contract");

        hospitalVaccineCount[address(this)] -= amount;
        hospitalVaccineCount[msg.sender] += amount;
    }
}
