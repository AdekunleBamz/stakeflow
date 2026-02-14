"use client";

import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetBlock: number;
  currentBlock: number;
  className?: string;
  onComplete?: () => void;
  showBlocks?: boolean;
}

export function CountdownTimer({
  targetBlock,
  currentBlock,
  className = "",
  onComplete,
  showBlocks = true,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const blocksRemaining = Math.max(0, targetBlock - currentBlock);

  useEffect(() => {
    if (blocksRemaining <= 0) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Calculate initial time based on blocks (10 min avg per block)
    const totalSeconds = blocksRemaining * 10 * 60;
    
    const calculateTime = (seconds: number) => {
      const days = Math.floor(seconds / (24 * 60 * 60));
      const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      const secs = seconds % 60;
      return { days, hours, minutes, seconds: secs };
    };

    setTimeRemaining(calculateTime(totalSeconds));

    // Update every second for visual countdown
    let remainingSeconds = totalSeconds;
    const interval = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds <= 0) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
        return;
      }
      setTimeRemaining(calculateTime(remainingSeconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [blocksRemaining, onComplete]);

  if (blocksRemaining <= 0) {
    return (
      <div className={`text-green-400 font-semibold flex items-center gap-1 ${className}`}>
        <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Ready!
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={className}>
      <div className="flex items-center gap-1 text-sm font-mono text-white bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 transition-colors duration-300">
        {timeRemaining.days > 0 && (
          <>
            <span className="font-bold text-indigo-400">{timeRemaining.days}</span>
            <span className="text-gray-500">d</span>
          </>
        )}
        <span className="font-bold text-purple-400">{formatNumber(timeRemaining.hours)}</span>
        <span className="text-gray-500">:</span>
        <span className="font-bold text-purple-400">{formatNumber(timeRemaining.minutes)}</span>
        <span className="text-gray-500">:</span>
        <span className="font-bold text-purple-400 animate-pulse">{formatNumber(timeRemaining.seconds)}</span>
      </div>
      {showBlocks && (
        <div className="text-xs text-gray-500 mt-2 ml-1 font-medium">
          {blocksRemaining.toLocaleString()} blocks remaining
        </div>
      )}
    </div>
  );
}

interface CountdownDisplayProps {
  label: string;
  targetBlock: number;
  currentBlock: number;
  onComplete?: () => void;
}

export function CountdownDisplay({
  label,
  targetBlock,
  currentBlock,
  onComplete,
}: CountdownDisplayProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 transition-all duration-300 hover:border-gray-600">
      <div className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">{label}</div>
      <CountdownTimer
        targetBlock={targetBlock}
        currentBlock={currentBlock}
        onComplete={onComplete}
        className="text-lg font-semibold"
      />
    </div>
  );
}
