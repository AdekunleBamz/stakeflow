"use client";

import { useWallet } from "@/contexts/WalletContext";

export default function Navbar() {
  const { isConnected, address, connect, disconnect } = useWallet();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">StakeFlow</span>
        </div>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <span className="text-gray-400 text-sm hidden md:block">
                {truncateAddress(address!)}
              </span>
              <button onClick={disconnect} className="btn-secondary text-sm py-2 px-4">
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={connect} className="btn-primary">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
