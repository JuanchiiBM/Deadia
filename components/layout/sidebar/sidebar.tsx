"use client"

import React, { useEffect } from "react";
import { Sidebar } from "./sidebar.styles";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout-context";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

const colorUser = localStorage.getItem('colorUser')

export const SidebarWrapper = () => {
    const pathname = usePathname();
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
                            isActive={pathname === "/"}
                            href="/"
                        />
                        <CollapseItems
                            icon={1}
                            items={["Visualizar Inscripciones", "Registrar Inscripciones"]}
                            path={["/inscripciones/verInscripcion", "/inscripciones/registrarInscripcion"]}
                            title="Inscripcion"
                        />
                        <CollapseItems
                            icon={2}
                            items={["Visualizar Egresos", "Registrar Egresos"]}
                            path={["/egresos/verEgreso", "/egresos/registrarEgreso"]}
                            title="Egreso"
                        />
                        <CollapseItems
                            icon={4}
                            items={["Visualizar Inventario", "Registrar Inventario"]}
                            path={["/inventario/verInventario", "/inventario/registrarInventario"]}
                            title="Inventario"
                        />
                        <CollapseItems
                            icon={3}
                            items={["Usuarios", "Perfiles", "Acciones"]}
                            path={["/sistema/usuarios", "/sistema/perfiles", "/sistema/acciones"]}
                            title="Sistema"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};