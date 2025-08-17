'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, hardhat } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

import { ConnectKitButton } from 'connectkit';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { DEX_CONTRACT_ADDRESS, DEX_ABI, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS } from '@/constants/dex';

const config = createConfig({
  chains: [mainnet, hardhat],
  transports: {
    [mainnet.id]: http(),
    [hardhat.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <div>
            <h1>Hello, Next.js with Wagmi!</h1>
            <ConnectKitButton />
            <DEXInterface />
          </div>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function DEXInterface() {
    const { address, isConnected } = useAccount();
    
    // Функції для взаємодії з контрактом
    const { writeContractAsync } = useWriteContract();

    // Виклик функції обміну токенів
    const handleSwap = async () => {
        if (!address) {
            console.error("Please connect your wallet.");
            return;
        }

        try {
            // Приклад виклику функції swapAForB.
            // Примітка: вам потрібно мати достатньо токенів А на балансі гаманця
            const tx = await writeContractAsync({
                address: DEX_CONTRACT_ADDRESS,
                abi: DEX_ABI,
                functionName: 'swap',
                args: [
                  1000000000000000000n,
                  TOKEN_B_ADDRESS,
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
            <button onClick={handleSwap}>Swap Token A for B</button>
        </div>
    );
}
