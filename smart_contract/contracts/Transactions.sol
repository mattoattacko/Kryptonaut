// this is our Solidity smart contract
// This page interacts with 'scripts/deploy.js' and 'hardhat.config'

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 'contract' is like a 'class' in other OOP languages
// 'uint256' (type) transactionCounter is a number variable that will hold the number of our transactions
// 'address' is the type. 'from' is a variable
contract Transactions {
  uint256 transactionCount;

  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  // our 'transactions' variable will be an [array] of 'TransferStruct'
  TransferStruct[] transactions;

  // since this is a class, we need to define the visibility of the function
  // the first parameter we pass is the 'receiver', which is going to be a payable address
  // 'memory' is some specific data stored in the memory of that transaction
  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
    transactionCount += 1;
    // we push the specific transaction into the array transactions. Also stores it
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

    // This is where we actually send/emit the event
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }
  
  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }
  
  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }
}