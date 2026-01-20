"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { NFTAsset } from "@/lib/types";

interface StakingContextType {
  selectedToStake: number[];
  selectedToUnstake: number[];
  toggleStakeSelection: (id: number) => void;
  toggleUnstakeSelection: (id: number) => void;
  selectAllForStake: (ids: number[]) => void;
  selectAllForUnstake: (ids: number[]) => void;
  clearStakeSelection: () => void;
  clearUnstakeSelection: () => void;
}

const StakingContext = createContext<StakingContextType | undefined>(undefined);

export function StakingProvider({ children }: { children: ReactNode }) {
  const [selectedToStake, setSelectedToStake] = useState<number[]>([]);
  const [selectedToUnstake, setSelectedToUnstake] = useState<number[]>([]);

  const toggleStakeSelection = (id: number) => {
    setSelectedToStake((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const toggleUnstakeSelection = (id: number) => {
    setSelectedToUnstake((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const selectAllForStake = (ids: number[]) => {
    setSelectedToStake(ids);
  };

  const selectAllForUnstake = (ids: number[]) => {
    setSelectedToUnstake(ids);
  };

  const clearStakeSelection = () => {
    setSelectedToStake([]);
  };

  const clearUnstakeSelection = () => {
    setSelectedToUnstake([]);
  };

  return (
    <StakingContext.Provider
      value={{
        selectedToStake,
        selectedToUnstake,
        toggleStakeSelection,
        toggleUnstakeSelection,
        selectAllForStake,
        selectAllForUnstake,
        clearStakeSelection,
        clearUnstakeSelection,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
}

export function useStakingContext() {
  const context = useContext(StakingContext);
  if (context === undefined) {
    throw new Error("useStakingContext must be used within a StakingProvider");
  }
  return context;
}
