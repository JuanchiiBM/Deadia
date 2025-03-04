"use client"

import React, { useEffect } from "react";
import { Sidebar } from "./sidebar.styles";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout-context";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import {useHandlerPermissions} from "@/components/layout/hooks/useHandlerPermissions";


const colorUser = localStorage.getItem('colorUser')

export const SidebarWrapper = () => {
    const pathname = usePathname();
    const { permissions, sistema, inscripcion, egreso, inventario } = useHandlerPermissions();

    let headerKey = 0
    const { collapsed, setCollapsed } = useSidebarContext();

    useEffect(() => {
        headerKey = 1
    }, [colorUser]);

    return (
        <aside
            className={Sidebar.Aside({
                collapsed: collapsed
            })}>
            {collapsed ? (
                <div className={Sidebar.Overlay()} onClick={setCollapsed} />
            ) : null}
            <div
            
                className={Sidebar({
                    collapsed: collapsed,
                })}
            >
                <div className={`flex justify-center text-2xl items-center px-6 py-0 my-0 w-full border-b-1 h-[60px]`}>
                    SIGMA
                </div>
                <div className="flex flex-col justify-between">
                    <div className={Sidebar.Body()}>
                    <SidebarItem
                            title="Home"
                            icon={<FontAwesomeIcon icon={faHouse} />}
                            isActive={pathname === "/home"}
                            href="/home"
                        />
                        {inscripcion.items.length > 0 &&
                        <CollapseItems
                            icon={1}
                            items={inscripcion.items}
                            path={inscripcion.paths}
                            title="Inscripcion"
                        />}
                        
                        {egreso.items.length > 0 &&
                        <CollapseItems
                            icon={2}
                            items={egreso.items}
                            path={egreso.paths}
                            title="Egreso"
                        />}

                        {inventario.items.length > 0 &&
                        <CollapseItems
                            icon={3}
                            items={inventario.items}
                            path={inventario.paths}
                            title="Inventario"
                        />}

                        {sistema.items.length > 0 &&
                        <CollapseItems
                            icon={4}
                            items={sistema.items}
                            path={sistema.paths}
                            title="Sistema"
                        />}
                    </div>
                </div>
            </div>
        </aside>
    );
};