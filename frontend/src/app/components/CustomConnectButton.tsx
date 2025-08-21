"use client";

import { ConnectKitButton } from "connectkit";

export default function CustomConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        return (
          <button
            onClick={show}
            className="space-x-2 py-2 px-4 rounded-full bg-[#e0e5ec] text-black font-bold
                   shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
                   dark:bg-[#1a202c] dark:text-white dark:shadow-[4px_4px_8px_#11161d,-4px_-4px_8px_#2b3341]"
          >
            {isConnected ? (
              ensName ? (
                ensName
              ) : (
                `${address?.slice(0, 6)}...${address?.slice(-4)}`
              )
            ) : isConnecting ? (
              "Connecting..."
            ) : (
              "Connect Wallet"
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
