// chains.ts > wagmi.ts > provaiders.tsx

import { createConfig, http } from 'wagmi'
import { SUPPORTED_CHAINS } from './chains'

export const config = createConfig({
  chains: [SUPPORTED_CHAINS[0], ...SUPPORTED_CHAINS.slice(1)] as const,
  transports: SUPPORTED_CHAINS.reduce(
    (acc, chain) => ({
      ...acc,
      [chain.id]: http(chain.rpcUrls.default.http[0]),
    }),
    {}
  ),
})

// Old logic

//import { http, createConfig } from 'wagmi';
//import { mainnet, hardhat } from 'wagmi/chains';

//export const config = createConfig({
//  chains: [mainnet, hardhat],
//  transports: {
//    [mainnet.id]: http(),
//    [hardhat.id]: http(),
//  },
//});


