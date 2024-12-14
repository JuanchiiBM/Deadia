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
    const { permissions, sistemaItems, sistemaPaths } = useHandlerPermissions();

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
                        {permissions.some((permission: IPermissionsContent) => permission.module == 'ingreso' && permission.action == 'VIEW') && 
                        <CollapseItems
                            icon={1}
                            items={["Visualizar Inscripciones", "Registrar Inscripciones"]}
                            path={["/inscripciones/verInscripcion", "/inscripciones/registrarInscripcion"]}
                            title="Inscripcion"
                        />}
                        
                        {permissions.some((permission: IPermissionsContent) => permission.module == 'egreso' && permission.action == 'VIEW') && 
                        <CollapseItems
                            icon={2}
                            items={["Visualizar Egresos", "Registrar Egresos"]}
                            path={["/egresos/verEgreso", "/egresos/registrarEgreso"]}
                            title="Egreso"
                        />}

                        {permissions.some((permission: IPermissionsContent) => permission.module == 'inventario' && permission.action == 'VIEW') && 
                        <CollapseItems
                            icon={4}
                            items={["Visualizar Inventario", "Registrar Inventario"]}
                            path={["/inventario/verInventario", "/inventario/registrarInventario"]}
                            title="Inventario"
                        />}

                        {sistemaItems.length > 0 &&
                        <CollapseItems
                            icon={3}
                            items={sistemaItems}
                            path={sistemaPaths}
                            title="Sistema"
                        />}
                    </div>
                </div>
            </div>
        </aside>
    );
};
