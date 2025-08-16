import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEXModule = buildModule("DEXModule", (m) => {
  // Deploying our first token
  const tokenA = m.contract("TokenA");

  // Deploy our second token
  const tokenB = m.contract("TokenB");

  // Deploy the DEX contract, passing the token addresses
  const dex = m.contract("DEX", [tokenA, tokenB]);

  // Return the expanded contracts
  return { tokenA, tokenB, dex };
});

export default DEXModule;