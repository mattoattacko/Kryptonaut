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

  console.log({
    provider,
    signer,
    transactionContract
  });

}

// creates context for the 'contractAddress'
// wraps the entire React app with all the data that gets passed in to it.
export const TransactionProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please connect to MetaMask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      //checks if wallet is connected.
      // at the start of each render, we will have access to our account
      // we will set the state to the first account
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.log('no accounts found');
      }
    } catch (error) {
      console.error(error);

      throw new Error('no ethereum object')
    }
  }

  // function to connect to the ethereum wallet
  const connectWallet = async () => {
    try {
      if(!ethereum) return alert('Please connect to MetaMask');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); // this allows us to get all of the users accounts, and from there the user can choose one

      setCurrentAccount(accounts[0]); // we set the current account to the first account in the array. set is like setState in React
    } catch (error) {
      console.error(error);

      throw new Error('no ethereum object')
    }
  }

  // First we check if the user is connected to the wallet.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      {children}
    </TransactionContext.Provider>
  )
}