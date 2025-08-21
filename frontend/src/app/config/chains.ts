import type { Chain } from 'wagmi/chains'

export const ethereum: Chain = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc.ankr.com/eth'] } },
  blockExplorers: { default: { name: 'Etherscan', url: 'https://etherscan.io' } },
}

export const polygon: Chain = {
  id: 137,
  name: 'Polygon',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc.ankr.com/polygon'] } },
  blockExplorers: { default: { name: 'Polygonscan', url: 'https://polygonscan.com' } },
}

export const arbitrum: Chain = {
  id: 42161,
  name: 'Arbitrum One',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://arb1.arbitrum.io/rpc'] } },
  blockExplorers: { default: { name: 'Arbiscan', url: 'https://arbiscan.io' } },
}

export const optimism: Chain = {
  id: 10,
  name: 'Optimism',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://mainnet.optimism.io'] } },
  blockExplorers: { default: { name: 'Optimistic Etherscan', url: 'https://optimistic.etherscan.io' } },
}

export const bsc: Chain = {
  id: 56,
  name: 'BNB Chain',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: { default: { http: ['https://bsc-dataseed.binance.org'] } },
  blockExplorers: { default: { name: 'BscScan', url: 'https://bscscan.com' } },
}

//Test network
export const hardhat: Chain = {
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['http://127.0.0.1:8545'] } },
  blockExplorers: { default: { name: 'Hardhat', url: '' } },
}

export const SUPPORTED_CHAINS: Chain[] = [ethereum, polygon, arbitrum, optimism, bsc , hardhat]
