"use client";

import React from "react";
import { NavbarWrapper } from "./navbar/navbar";
import { SidebarWrapper } from "./sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import SpinnerComponent from "@/components/spinner/Spinner";
import { useTheme as useNextTheme } from "next-themes";

interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [showSpinner, setShowSpinner] = React.useState(false);
    const { setTheme, resolvedTheme } = useNextTheme();

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <SidebarContext.Provider
            value={{
                collapsed: sidebarOpen,
                setCollapsed: handleToggleSidebar,
                showSpinner: showSpinner,
                setShowSpinner: setShowSpinner,
                resolveTheme: resolvedTheme,
                setTheme: setTheme,
            }}>
            {showSpinner && <SpinnerComponent />}
            <section className='flex'>
                <SidebarWrapper />
                <NavbarWrapper>{children}</NavbarWrapper>
            </section>
        </SidebarContext.Provider>
    );
};
