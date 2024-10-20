import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="z-[30] relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden justify-start">
      <Navbar
        isBordered
        className="w-full justify-end fixed h-[60px]"
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
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      <section className="px-20 py-10 my-10">
        {children}
      </section>
    </div>
  );
};
