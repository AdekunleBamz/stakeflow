"use client";

import React from "react";

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
  return (
    <div className={`flex border-b border-gray-800 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
          )}
        </button>
      ))}
    </div>
  );
}

interface TabPanelProps {
  children: React.ReactNode;
  activeTab: string;
  tabId: string;
}

export function TabPanel({ children, activeTab, tabId }: TabPanelProps) {
  if (activeTab !== tabId) return null;
  return <div className="py-4">{children}</div>;
}
