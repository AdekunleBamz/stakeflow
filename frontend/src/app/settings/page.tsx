'use client';

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';

interface SettingSection {
  title: string;
  description: string;
}

function ToggleSetting({ 
  label, 
  description, 
  enabled, 
  onChange 
}: { 
  label: string; 
  description: string; 
  enabled: boolean; 
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0">
      <div>
        <h4 className="text-white font-medium">{label}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-purple-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function SelectSetting({
  label,
  description,
  value,
  options,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0">
      <div>
        <h4 className="text-white font-medium">{label}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-purple-500 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function SettingsPage() {
  const { isConnected, address, disconnect } = useWallet();

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [autoClaimRewards, setAutoClaimRewards] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [currency, setCurrency] = useState('usd');
  const [language, setLanguage] = useState('en');

  const handleSaveSettings = () => {
    // Would save to local storage or backend
    alert('Settings saved!');
  };

  const handleDisconnect = () => {
    if (disconnect) {
      disconnect();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>

        {isConnected ? (
          <div className="max-w-3xl space-y-8">
            {/* Account Section */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Account</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-gray-700">
                  <div>
                    <h4 className="text-white font-medium">Connected Wallet</h4>
                    <p className="text-gray-400 text-sm font-mono">{address}</p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-white font-medium">Network</h4>
                    <p className="text-gray-400 text-sm">Current network connection</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Mainnet
                  </span>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
              <div>
                <ToggleSetting
                  label="Push Notifications"
                  description="Receive browser notifications for important events"
                  enabled={notifications}
                  onChange={setNotifications}
                />
                <ToggleSetting
                  label="Email Alerts"
                  description="Get email updates about your staking activity"
                  enabled={emailAlerts}
                  onChange={setEmailAlerts}
                />
              </div>
            </section>

            {/* Staking Preferences */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Staking Preferences</h2>
              <div>
                <ToggleSetting
                  label="Auto-Claim Rewards"
                  description="Automatically claim rewards when they reach a threshold"
                  enabled={autoClaimRewards}
                  onChange={setAutoClaimRewards}
                />
                <ToggleSetting
                  label="Show Balances"
                  description="Display token balances on the dashboard"
                  enabled={showBalances}
                  onChange={setShowBalances}
                />
              </div>
            </section>

            {/* Display Settings */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Display</h2>
              <div>
                <SelectSetting
                  label="Theme"
                  description="Choose your preferred color theme"
                  value={theme}
                  options={[
                    { value: 'dark', label: 'Dark' },
                    { value: 'light', label: 'Light' },
                    { value: 'system', label: 'System' },
                  ]}
                  onChange={setTheme}
                />
                <SelectSetting
                  label="Currency"
                  description="Display prices in your preferred currency"
                  value={currency}
                  options={[
                    { value: 'usd', label: 'USD ($)' },
                    { value: 'eur', label: 'EUR (€)' },
                    { value: 'gbp', label: 'GBP (£)' },
                    { value: 'btc', label: 'BTC (₿)' },
                  ]}
                  onChange={setCurrency}
                />
                <SelectSetting
                  label="Language"
                  description="Choose your preferred language"
                  value={language}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Español' },
                    { value: 'fr', label: 'Français' },
                    { value: 'de', label: 'Deutsch' },
                  ]}
                  onChange={setLanguage}
                />
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
              >
                Save Settings
              </button>
            </div>

            {/* Danger Zone */}
            <section className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
              <p className="text-gray-400 mb-4">
                These actions are irreversible. Please proceed with caution.
              </p>
              <div className="flex gap-4">
                <button className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors">
                  Clear Local Data
                </button>
                <button className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors">
                  Reset All Settings
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect to Access Settings</h2>
            <p className="text-gray-400">Connect your wallet to customize your preferences</p>
          </div>
        )}
      </div>
    </div>
  );
}
