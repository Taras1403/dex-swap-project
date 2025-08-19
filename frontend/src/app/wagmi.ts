import { http, createConfig } from 'wagmi';
import { mainnet, hardhat } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, hardhat],
  transports: {
    [mainnet.id]: http(),
    [hardhat.id]: http(),
  },
});