// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Edulive {
    address private owner;
    uint256 transactionCounts;
    mapping(address => uint) balanceOf;
    mapping(address => uint256) public totalDonations;
    uint256 public totalDonationsReceived;

    event Transfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        string remark,
        uint256 timestamp
    );

    event Donation(address indexed donor, uint256 amount, uint256 streamId);

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string remark;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    constructor() {
        owner = msg.sender;
        balanceOf[tx.origin] = msg.sender.balance;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function donate(uint256 _streamId) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        totalDonations[msg.sender] += msg.value;
        totalDonationsReceived += msg.value;

        emit Donation(msg.sender, msg.value, _streamId);
    }

    function getDonorTotalDonations(
        address _donor
    ) public view returns (uint256) {
        return totalDonations[_donor];
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        payable(owner).transfer(balance);
    }

    function sendMoney(
        address payable receiver,
        uint256 amount,
        string memory remark
    ) public returns (bool success) {
        if (balanceOf[owner] < amount) return false;
        balanceOf[owner] -= amount;
        balanceOf[receiver] += amount;

        transactionCounts += 1;
        transactions.push(
            TransferStruct(owner, receiver, amount, remark, block.timestamp)
        );

        emit Transfer(msg.sender, receiver, amount, remark, block.timestamp);
        return true;
    }

    function getBalance(address addr) public view returns (uint) {
        return balanceOf[addr];
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactionCounts;
    }
}
