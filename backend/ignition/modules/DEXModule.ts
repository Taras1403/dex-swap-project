import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEXModule = buildModule("DEXModule", (m) => {
  const tokenA = m.contract("TokenA", ["Token A", "TKA"]);
  const tokenB = m.contract("TokenB", ["Token B", "TKB"]);

  const dex = m.contract("DEX", [tokenA, tokenB]);

  return { tokenA, tokenB, dex };
});

export default DEXModule;