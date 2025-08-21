'use client';

import React, { useState } from 'react';
import { FaExchangeAlt, FaChevronDown } from 'react-icons/fa';
import { useAccount, useWriteContract } from 'wagmi';
import { DEX_CONTRACT_ADDRESS, DEX_ABI, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS, TOKEN_A_ABI } from '@/constants/dex';

import Image from 'next/image';
import CustomConnectButton from './CustomConnectButton';

export default function DEXInterface() {
    const [activeButton, setActiveButton] = useState('swap');

    const handleSwapClick = () => {
        setActiveButton('swap');
    };

    const handleCrossChainClick = () => {
        setActiveButton('cross-chain');
    };

    const { address, isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract();

    const handleApprove = async () => {
            if (!address) {
                console.error("Please connect your wallet.");
                return;
            }
    
            try {
                const tx = await writeContractAsync({
                    address: TOKEN_A_ADDRESS,
                    abi: TOKEN_A_ABI,
                    functionName: 'approve',
                    args: [
                        DEX_CONTRACT_ADDRESS, 
                        1000000000000000000n // The number of tokens you allow DEX to use
                    ],
                });
                console.log('Approve transaction hash:', tx);
                alert(`Approve transaction sent! Hash: ${tx}`);
            } catch (e) {
                console.error('Approve failed:', e);
                if (e instanceof Error) {
                    alert(`Approve failed: ${e.message}`);
                } else {
                    alert('Approve failed: An unknown error occurred.');
                }
            }
        };
    const handleSwap = async () => {
            if (!address) {
                console.error("Please connect your wallet.");
                return;
            }
    
            try {
                // Example of calling the swapAForB function.
                // Note: you need to have enough A tokens in your wallet balance.
                const tx = await writeContractAsync({
                    address: DEX_CONTRACT_ADDRESS,
                    abi: DEX_ABI,
                    functionName: 'swap',
                    args: [
                      TOKEN_A_ADDRESS,
                      1000000000000000000n,
                    ],
                });
                console.log('Transaction hash:', tx);
                alert(`Transaction sent! Hash: ${tx}`);
            } catch (e) {
                console.error('Swap failed:', e);
                if (e instanceof Error) {
                  alert(`Swap failed: ${e.message}`);
                } else {
                  alert('Swap failed: An unknown error occurred.');
                }
            }
        };

    return (
        <div className="bg-[#e0e5ec] p-6 rounded-3xl shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff]
                        dark:bg-[#1a202c] dark:shadow-[10px_10px_20px_#11161d,-10px_-10px_20px_#2b3341]">
            <div className="flex justify-around mb-4 space-x-4">
                <button className={`py-2 px-6 rounded-full font-bold
                            ${activeButton === 'swap' 
                                ? 'bg-[#e0e5ec] text-black shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} onClick={handleSwapClick}>
                    Swap
                </button>
                <button className={`py-2 px-6 rounded-full font-bold
                            ${activeButton === 'cross-chain' 
                                ? 'bg-[#e0e5ec] text-black shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff] dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} onClick={handleCrossChainClick}>
                    Cross-Chain
                </button>
            </div>

            <div className="bg-[#e0e5ec] p-4 rounded-xl mb-4
                            shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
                            dark:bg-[#1a202c] dark:shadow-[inset_4px_4px_8px_#11161d,inset_-4px_-4px_8px_#2b3341]">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Sell</span>
                    <div className="flex items-center space-x-2">
                        <Image src="/eth.png" alt="ETH" width={24} height={24} />
                        <span className="font-bold text-black dark:text-white">ETH</span>
                        <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                    </div>
                </div>
                <div className="text-4xl font-bold mt-2 text-black dark:text-white">
                    0.0
                </div>
            </div>

            <div className="flex justify-center my-4">
                <button className="p-2 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                                   dark:bg-[#1a202c] dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]">
                    <FaExchangeAlt className="text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            <div className="bg-[#e0e5ec] p-4 rounded-xl mb-6
                            shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
                            dark:bg-[#1a202c] dark:shadow-[inset_4px_4px_8px_#11161d,inset_-4px_-4px_8px_#2b3341]">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Buy</span>
                    <div className="flex items-center space-x-2">
                        <Image src="/sushi.png" alt="SUSHI" width={24} height={24} />
                        <span className="font-bold text-black dark:text-white">SUSHI</span>
                        <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                    </div>
                </div>
                <div className="text-4xl font-bold mt-2 text-black dark:text-white">
                    0.0
                </div>
            </div>

            <div className="flex justify-between space-x-4">
                {isConnected ? (
                    <>
                        <button className="py-3 px-6 rounded-full flex-1 bg-[#e0e5ec] text-black font-bold
                                        shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                                        dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]" onClick={handleApprove}>
                            Approve
                        </button>
                        <button className="py-3 px-6 rounded-full flex-1 bg-[#e0e5ec] text-black font-bold
                                        shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                                        dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]" onClick={handleSwap}>
                            Swap
                        </button>
                    </>
                ) : (
                    <CustomConnectButton />
                )}
            </div>
        </div>
    );
}