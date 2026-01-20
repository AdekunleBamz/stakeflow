"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";
import { Avatar } from "./ui/Avatar";
import { truncateAddress } from "@/lib/utils";

export function NavbarEnhanced() {
  const pathname = usePathname();
  const { isConnected, address, connect, disconnect } = useWallet();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/stats", label: "Stats" },
    { href: "/docs", label: "Docs" },
    { href: "/faq", label: "FAQ" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">StakeFlow</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <Avatar address={address} size="sm" />
                <div className="hidden md:block">
                  <p className="text-sm text-white font-medium">
                    {truncateAddress(address)}
                  </p>
                </div>
                <button
                  onClick={disconnect}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  title="Disconnect"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button onClick={connect} className="btn-primary text-sm py-2 px-4">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
