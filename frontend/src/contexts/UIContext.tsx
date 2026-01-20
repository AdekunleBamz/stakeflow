"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";

// Types
interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  modalStack: string[];
  activeTab: string;
  isLoading: boolean;
  loadingMessage: string;
}

type UIAction =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "SET_MOBILE_MENU"; payload: boolean }
  | { type: "PUSH_MODAL"; payload: string }
  | { type: "POP_MODAL" }
  | { type: "CLOSE_ALL_MODALS" }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "SET_LOADING"; payload: { isLoading: boolean; message?: string } };

interface UIContextType extends UIState {
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
  pushModal: (id: string) => void;
  popModal: () => void;
  closeAllModals: () => void;
  setActiveTab: (tab: string) => void;
  setLoading: (isLoading: boolean, message?: string) => void;
  isModalOpen: (id: string) => boolean;
}

// Initial state
const initialState: UIState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  modalStack: [],
  activeTab: "dashboard",
  isLoading: false,
  loadingMessage: "",
};

// Reducer
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_SIDEBAR":
      return { ...state, sidebarOpen: action.payload };
    case "TOGGLE_MOBILE_MENU":
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case "SET_MOBILE_MENU":
      return { ...state, mobileMenuOpen: action.payload };
    case "PUSH_MODAL":
      return { ...state, modalStack: [...state.modalStack, action.payload] };
    case "POP_MODAL":
      return { ...state, modalStack: state.modalStack.slice(0, -1) };
    case "CLOSE_ALL_MODALS":
      return { ...state, modalStack: [] };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loadingMessage: action.payload.message || "",
      };
    default:
      return state;
  }
}

// Context
const UIContext = createContext<UIContextType | null>(null);

// Provider
interface UIProviderProps {
  children: React.ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }, []);

  const setSidebar = useCallback((open: boolean) => {
    dispatch({ type: "SET_SIDEBAR", payload: open });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    dispatch({ type: "TOGGLE_MOBILE_MENU" });
  }, []);

  const setMobileMenu = useCallback((open: boolean) => {
    dispatch({ type: "SET_MOBILE_MENU", payload: open });
  }, []);

  const pushModal = useCallback((id: string) => {
    dispatch({ type: "PUSH_MODAL", payload: id });
  }, []);

  const popModal = useCallback(() => {
    dispatch({ type: "POP_MODAL" });
  }, []);

  const closeAllModals = useCallback(() => {
    dispatch({ type: "CLOSE_ALL_MODALS" });
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: tab });
  }, []);

  const setLoading = useCallback((isLoading: boolean, message?: string) => {
    dispatch({ type: "SET_LOADING", payload: { isLoading, message } });
  }, []);

  const isModalOpen = useCallback(
    (id: string) => state.modalStack.includes(id),
    [state.modalStack]
  );

  const value: UIContextType = {
    ...state,
    toggleSidebar,
    setSidebar,
    toggleMobileMenu,
    setMobileMenu,
    pushModal,
    popModal,
    closeAllModals,
    setActiveTab,
    setLoading,
    isModalOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// Hook
export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
