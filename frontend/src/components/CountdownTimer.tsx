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
      <div className={`text-green-400 font-semibold ${className}`}>
        Ready!
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={className}>
      <div className="flex items-center gap-1 text-sm font-mono">
        {timeRemaining.days > 0 && (
          <>
            <span className="text-white">{timeRemaining.days}</span>
            <span className="text-gray-500">d</span>
          </>
        )}
        <span className="text-white">{formatNumber(timeRemaining.hours)}</span>
        <span className="text-gray-500">:</span>
        <span className="text-white">{formatNumber(timeRemaining.minutes)}</span>
        <span className="text-gray-500">:</span>
        <span className="text-white">{formatNumber(timeRemaining.seconds)}</span>
      </div>
      {showBlocks && (
        <div className="text-xs text-gray-500 mt-1">
          {blocksRemaining.toLocaleString()} blocks
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
    <div className="bg-gray-800/50 rounded-lg p-4">
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <CountdownTimer
        targetBlock={targetBlock}
        currentBlock={currentBlock}
        onComplete={onComplete}
        className="text-lg"
      />
    </div>
  );
}
