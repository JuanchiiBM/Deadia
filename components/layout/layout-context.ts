"use client";

import { createContext, useContext } from "react";

interface SidebarContext {
  collapsed: boolean;
  setCollapsed: () => void;
  showSpinner: boolean
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => {},
  showSpinner: false,
  setShowSpinner: () => {}
});

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
