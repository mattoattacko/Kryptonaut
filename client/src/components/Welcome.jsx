import React, { useContext } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from '../context/TransactionContext';
import { Loader } from "./"

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// We create this as custom component because we will need to use this info multiple times and we don't want to write the same thing over and over //
const Input = ({placeholder, name, type, value, handleChange}) => (
  <input 
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    step='0.0001'
    className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
  />
)

const Welcome = () => {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if(!addressTo || !amount || !keyword || !message) return alert('Please fill out all fields');

    sendTransaction();
  };
  

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className='flex flex-1 justify-start flex-col mf:mr-10'>
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
            I like turtles. Lots of turtles. Especially turtles that are cute and trade cryptocurrency!
          </p>
          {/* If there already is a currentAccount, we wont show this button  */}
          {!currentAccount && (
            <button
              type='button'
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
            >
              <p className='text-white text-base font-semibold'>Connect Wallet</p>
            </button>
          )}
         

          {/* Grid with all our features */}
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              Reliability
            </div>
            <div className={commonStyles}>
              Security
            </div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>
              Ethereum
            </div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>
              Web 3.0
            </div>
            <div className={commonStyles}>
              Lower Fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        {/* The right side of our desktop Welcome view */}
        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glasmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between icons-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff' />
              </div>
              <div>
                <p className='text-white font-light text-sm'>
                  Address
                </p>      
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
          {/* handleChange function updates these Inputs dynamically depending on the name of the specific Input. Must match what we have in the state over in TransactionProvider. */}
            <Input placeholder='Address To' name='addressTo' type='text' handleChange={handleChange} />
            <Input placeholder='Amount (ETH)' name='amount' type='number' handleChange={handleChange} />
            <Input placeholder='Keyword (Gif)' name='keyword' type='text' handleChange={handleChange} />
            <Input placeholder='Enter Message' name='message' type='text' handleChange={handleChange} />

            {/* The Line */}
            <div className='h-[1px] bg-gray-400 my-2' />

            {/* The Send Now Button */}
            {false ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'
              >
                Send Now
              </button>
            )}
          </div>


        </div>


      </div>
    </div>
  );
}

export default Welcome;