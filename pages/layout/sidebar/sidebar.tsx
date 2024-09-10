import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { HomeIcon } from "@/components/icons/sidebar/home-icon";
import { PaymentsIcon } from "@/components/icons/sidebar/payments-icon";
import { BalanceIcon } from "@/components/icons/sidebar/balance-icon";
import { AccountsIcon } from "@/components/icons/sidebar/accounts-icon";
import { CustomersIcon } from "@/components/icons/sidebar/customers-icon";
import { ProductsIcon } from "@/components/icons/sidebar/products-icon";
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";
import { DevIcon } from "@/components/icons/sidebar/dev-icon";
import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "@/components/icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout-context";
import { ChangeLogIcon } from "@/components/icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          DEADIA
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Administración">
              <SidebarItem
                isActive={pathname === "/incoms"}
                title="Ingresos"
                icon={<AccountsIcon />}
                href="incoms"
              />
              <SidebarItem
                isActive={pathname === "/gastos"}
                title="Gastos"
                icon={<PaymentsIcon />}
              />
            </SidebarMenu>
            <SidebarMenu title="Configuración del Sistema">
              <SidebarItem
                isActive={pathname === "/users"}
                title="Usuarios"
                icon={<AccountsIcon />}
                href="users"
              />
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
            </SidebarMenu>
            <SidebarMenu title="Idiomas">
              <SidebarItem
                isActive={pathname === "/registrarIngreso"}
                title="Registrar Ingreso"
                icon={<AccountsIcon />}
                href="registrarIngreso"
              />
            </SidebarMenu>
            <SidebarMenu title="Informática">
              <SidebarItem
                isActive={pathname === "/registrarIngreso"}
                title="Registrar Ingreso"
                icon={<AccountsIcon />}
                href="registrarIngreso"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
