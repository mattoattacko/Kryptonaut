import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

// creates React context
export const TransactionContext = React.createContext();

// ethereum object. We destructure it
const { ethereum } = window;

// fetches our ethereum contract
// contractAddress is from our json filter
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer) // the contractABI is our JSON file in utils

  return transactionContract;
}

// creates context for the 'contractAddress'
// wraps the entire React app with all the data that gets passed in to it.
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');

  // gets data from our Input fields in Welcome.jsx and adds it to transaction context
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount')); // gets the transaction count from localStorage
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    // dynamically updates the form data
    setFormData((prevState) => ({...prevState, [name]: e.target.value}));
  }

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask'); // checks if metamask installed

      const transactionContract = getEthereumContract(); // gets our ethereum contract
      const availableTransactions = await transactionContract.getAllTransactions(); // gets all transactions from our contract

      // Structures the transaction so its more readable
      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))


      console.log(structuredTransactions);

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask'); // checks if metamask installed

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      //checks if wallet is connected.
      // at the start of each render, we will have access to our account
      // we will set the state to the first account
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log('no accounts found');
      }
    } catch (error) {
      console.error(error);

      throw new Error('no ethereum object')
    }
  }

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract(); 
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.error(error);

      throw new Error('no ethereum object')
    }
  }

  // function to connect to the ethereum wallet
  const connectWallet = async () => {
    try {
      if(!ethereum) return alert('Please connect to MetaMask'); // checks if user has metamask installed

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); // this allows us to get all of the users accounts, and from there the user can choose one

      setCurrentAccount(accounts[0]); // we set the current account to the first account in the array. set is like setState in React
    } catch (error) {
      console.error(error);

      throw new Error('no ethereum object')
    }
  }

  // Logic for sending/storing transactions 
  const sendTransaction = async () => {
    try {
      if(!ethereum) return alert('Please connect to MetaMask');

      // get the data from the form...
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract(); // can use this variable to call all contract related functions
      //converts GWEI or hexidecimal. Ethers package does decimals and shit for conversions 
      const parsedAmount = ethers.utils.parseEther(amount);

      // just sends ethereum from one address to another. Still need our 'addToBlockchain' function to store the transaction that just happened.
      await ethereum.request({ 
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex,
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash}`);
      await transactionHash.wait(); // waits for the transaction to be finished

      setIsLoading(false);
      console.log(`Success - ${transactionHash}`);

      // Transaction Count
      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());

      window.reload()
    } catch (error) {
      console.error(error);

      throw new Error('no ethereum object')
    }
  }

  // First we check if the user is connected to the wallet.
  // Then we set up the current number of transactions so that for every new transaction, we know which one it is.
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
      {children}
    </TransactionContext.Provider>
  )
}