"use client";

import React, { useState } from "react";
import { useChainId, useChains, useSwitchChain } from "wagmi";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export default function NetworkSwitcher() {
  const chainId = useChainId();
  const chains = useChains(); 
  const { switchChain, isPending } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);

  //Adding icons for networks, only after adding a network in the chains.ts file
  const getChainIcon = (id: number) => {
    switch (id) {
      case 1:
        return "./chains/ethereum.svg";
      case 137:
        return "./chains/polygon.svg";
      case 42161:
        return "./chains/arbitrum.svg";
      case 10:
        return "./chains/optimism.svg";
      case 56:
        return "./chains/bnb.svg";
      case 31337:
        return "./chains/file_2.svg";  
      default:
        return "./chains/file_2.svg";
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 py-2 px-4 rounded-full bg-[#e0e5ec] text-black font-bold
                   shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                   dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]"
      >
        {chainId && getChainIcon(chainId) && (
          <Image src={getChainIcon(chainId)} alt="" width={20} height={20} className="rounded-full w-5 h-5" />
        )}
        <span className="hidden sm:inline">
          {chains.find((c) => c.id === chainId)?.name ?? "Select Network"}
        </span>
        <FaChevronDown className="text-gray-500 dark:text-gray-400 text-sm" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#e0e5ec] rounded-lg shadow-lg z-10
                        dark:bg-[#1a202c] dark:shadow-[10px_10px_20px_#11161d,-10px_-10px_20px_#2b3341]">
          {chains.map((x) => (
            <button
              key={x.id}
              onClick={() => {
                switchChain?.({ chainId: x.id });
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg
                         flex items-center space-x-2"
              disabled={!switchChain || x.id === chainId || isPending}
            >
              {getChainIcon(x.id) && (
                <Image src={getChainIcon(x.id)} alt={x.name} width={20} height={20} className="rounded-full w-5 h-5" />
              )}
              <span>{x.name}</span>
              {x.id === chainId && <span className="ml-auto text-blue-500">✔</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
