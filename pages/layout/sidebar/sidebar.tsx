import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "@/components/icons/sidebar/home-icon";
import { PaymentsIcon } from "@/components/icons/sidebar/payments-icon";
import { AccountsIcon } from "@/components/icons/sidebar/accounts-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout-context";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
    const pathname = usePathname();
    const { collapsed, setCollapsed } = useSidebarContext();

    return (
        <aside className="h-screen z-[40] sticky top-0">
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
                            icon={<HomeIcon />}
                            isActive={pathname === "/"}
                            href="/"
                        />
                        <CollapseItems
                            icon={<AccountsIcon />}
                            items={["Visualizar Ingresos", "Registrar Ingresos"]}
                            path={["/Ingresos/verIngreso", "/Ingresos/registrarIngreso"]}
                            title="Ingreso"
                        />
                        <CollapseItems
                            icon={<AccountsIcon />}
                            items={["Visualizar Egresos", "Registrar Egresos"]}
                            path={["/Egresos/verEgreso", "/Egresos/registrarEgreso"]}
                            title="Egreso"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};
