import React, { useEffect } from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "@/components/icons/sidebar/home-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout-context";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { IPermissionsContent } from "@/helpers/interfaces";
import { useHandlerPermissions } from "@/hooks/layout/useHandlerPermissions";


export const SidebarWrapper = () => {
    const pathname = usePathname();
    const { collapsed, setCollapsed } = useSidebarContext();
    const { permissions, sistema, inscripcion, egreso, inventario } = useHandlerPermissions();

    return (
        <aside className={Sidebar.Aside({
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
                <div className={Sidebar.Header()}>
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
