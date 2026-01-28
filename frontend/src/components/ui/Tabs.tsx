"use client";

import { ReactNode, useState, createContext, useContext } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: "default" | "pills" | "underline" | "enclosed";
  size: "sm" | "md" | "lg";
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

interface TabsProps {
  children: ReactNode;
  defaultTab: string;
  onChange?: (tab: string) => void;
  variant?: "default" | "pills" | "underline" | "enclosed";
  size?: "sm" | "md" | "lg";
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Tabs({
  children,
  defaultTab,
  onChange,
  variant = "default",
  size = "md",
  className = "",
  orientation = "horizontal",
}: TabsProps) {
  const [activeTab, setActiveTabState] = useState(defaultTab);

  const setActiveTab = (id: string) => {
    setActiveTabState(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, size }}>
      <div
        className={`${orientation === "vertical" ? "flex gap-6" : ""} ${className}`}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
  fullWidth?: boolean;
}

export function TabList({ children, className = "", centered = false, fullWidth = false }: TabListProps) {
  const { variant } = useTabsContext();

  const variantStyles = {
    default: "border-b border-gray-800",
    pills: "bg-gray-800/50 rounded-lg p-1",
    underline: "",
    enclosed: "border border-gray-800 rounded-t-lg",
  };

  return (
    <div
      role="tablist"
      className={`flex ${fullWidth ? "" : "w-fit"} ${centered ? "justify-center" : ""} gap-1 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

interface TabProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: string | number;
}

export function Tab({ id, children, disabled = false, icon, badge }: TabProps) {
  const { activeTab, setActiveTab, variant, size } = useTabsContext();
  const isActive = activeTab === id;

  const sizeStyles = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "pills":
        return isActive
          ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
          : "text-gray-400 hover:text-white hover:bg-gray-700/50";
      case "underline":
        return isActive
          ? "text-purple-400 border-b-2 border-purple-500 -mb-px"
          : "text-gray-400 hover:text-white border-b-2 border-transparent -mb-px";
      case "enclosed":
        return isActive
          ? "bg-gray-900 text-white border border-gray-800 border-b-gray-900 -mb-px rounded-t-lg"
          : "text-gray-400 hover:text-white border border-transparent";
      default:
        return isActive
          ? "text-purple-400 border-b-2 border-purple-500 -mb-px"
          : "text-gray-400 hover:text-white border-b-2 border-transparent -mb-px";
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(id)}
      className={`flex items-center gap-2 font-medium transition-all duration-200 rounded-md ${sizeStyles[size]} ${getVariantStyles()} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {badge !== undefined && (
        <span
          className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
            isActive
              ? "bg-purple-500/30 text-purple-300"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

interface TabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ id, children, className = "" }: TabPanelProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${id}`}
      aria-labelledby={id}
      className={`animate-in fade-in duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

interface TabPanelsProps {
  children: ReactNode;
  className?: string;
}

export function TabPanels({ children, className = "" }: TabPanelsProps) {
  return <div className={`mt-4 ${className}`}>{children}</div>;
}

// Simplified tab component for quick usage
interface SimpleTabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface SimpleTabsProps {
  tabs: SimpleTabItem[];
  defaultTab?: string;
  onChange?: (tab: string) => void;
  variant?: "default" | "pills" | "underline" | "enclosed";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SimpleTabs({
  tabs,
  defaultTab,
  onChange,
  variant = "default",
  size = "md",
  className = "",
}: SimpleTabsProps) {
  const defaultId = defaultTab || tabs[0]?.id;

  return (
    <Tabs defaultTab={defaultId} onChange={onChange} variant={variant} size={size} className={className}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.id} id={tab.id} icon={tab.icon} disabled={tab.disabled} badge={tab.badge}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} id={tab.id}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
