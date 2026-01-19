"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
  userSession: UserSession;
  network: StacksMainnet;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const network = new StacksMainnet();

  // Check if already signed in on mount
  React.useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setAddress(userData.profile.stxAddress.mainnet);
      setIsConnected(true);
    }
  }, []);

  const connect = useCallback(() => {
    showConnect({
      appDetails: {
        name: "StakeFlow",
        icon: "https://stakeflow.app/logo.png",
      },
      redirectTo: "/",
      onFinish: () => {
        const userData = userSession.loadUserData();
        setAddress(userData.profile.stxAddress.mainnet);
        setIsConnected(true);
      },
      userSession,
    });
  }, []);

  const disconnect = useCallback(() => {
    userSession.signUserOut();
    setAddress(null);
    setIsConnected(false);
  }, []);

  return (
    <WalletContext.Provider
      value={{ isConnected, address, connect, disconnect, userSession, network }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
