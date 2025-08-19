'use client';

import { WagmiProvider, useReadContract, useWriteContract, useAccount } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig, } from 'connectkit';
import Image from 'next/image';
import Head from 'next/head';
import Header from './components/Header';

import { DEX_CONTRACT_ADDRESS, DEX_ABI, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS, TOKEN_A_ABI } from '@/constants/dex';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div>
      <h1>Hello, Next.js with Wagmi!</h1>
      <DEXInterface />
    </div>
  );
}

function DEXInterface() {
    const { address, isConnected } = useAccount();
    
    // Functions for interacting with the contract
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

    if (!isConnected) {
        return (
            <div>
                <h2>DEX Interface</h2>
                <p>Please connect your wallet to use the DEX.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>DEX Interface</h2>
            <button onClick={handleApprove} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">Approve Token A</button>
            <button className="swap-button" onClick={handleSwap}>Swap Token A for B</button>
        </div>
    );
}
