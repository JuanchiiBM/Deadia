import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout-context";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

export const SidebarWrapper = () => {
    const pathname = usePathname();
    const { collapsed, setCollapsed } = useSidebarContext();

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
                            isActive={pathname === "/"}
                            href="/"
                        />
                        <SidebarItem
                            title="ListExample"
                            icon={<FontAwesomeIcon icon={faHouse} />}
                            isActive={pathname === "/listExample"}
                            href="/listExample"
                        />
                        <SidebarItem
                            title="GraphExample"
                            icon={<FontAwesomeIcon icon={faHouse} />}
                            isActive={pathname === "/graphExample"}
                            href="/graphExample"
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