import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden justify-end">
      <Navbar
        isBordered
        className="w-full justify-end"
        classNames={{
          wrapper: "justify-end",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>

        <NavbarContent
          justify="end"
          className="data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};