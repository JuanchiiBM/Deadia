"use client";

import { createContext, useContext } from "react";

interface SidebarContext {
  collapsed: boolean;
  setCollapsed: () => void;
  showSpinner: boolean
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>
  resolveTheme: string | undefined
  setTheme: any
}

export const SidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => {},
  showSpinner: false,
  setShowSpinner: () => {},
  resolveTheme: 'light',
  setTheme: () => {}
});

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
