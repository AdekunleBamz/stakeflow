"use client";

import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";

export default function Navbar() {
  const { isConnected, address, connect, disconnect } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav 
      className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-200">
            StakeFlow
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <span 
                className="text-gray-400 text-sm hidden md:block px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 transition-all duration-200 hover:bg-gray-800/50"
                title={address}
              >
                {truncateAddress(address!)}
              </span>
              <button 
                onClick={disconnect} 
                className="btn-secondary text-sm py-2 px-4 hover:bg-gray-800/50 active:scale-95"
                aria-label="Disconnect wallet"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button 
              onClick={connect} 
              className="btn-primary hover:shadow-2xl active:scale-95"
              aria-label="Connect crypto wallet"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
