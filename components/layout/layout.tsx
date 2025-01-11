"use client";

import React from "react";
import { NavbarWrapper } from "./navbar/navbar";
import { SidebarWrapper } from "./sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import SpinnerComponent from "@/components/spinner/Spinner";

interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [showSpinner, setShowSpinner] = React.useState(false);
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <SidebarContext.Provider
            value={{
                collapsed: sidebarOpen,
                setCollapsed: handleToggleSidebar,
                showSpinner: showSpinner,
                setShowSpinner: setShowSpinner
            }}>
                {showSpinner && <SpinnerComponent/>}
            <section className='flex'>
                <SidebarWrapper />
                <NavbarWrapper>{children}</NavbarWrapper>
            </section>
        </SidebarContext.Provider>
    );
};
