import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { NavbarStyle } from "./navbar.styles";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";

interface Props {
    children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
    return (
        <div className={NavbarStyle()}>
            <BurguerButton />
            <Navbar
                isBordered
                className="w-full justify-end fixed h-[60px] z-[30] "
                classNames={{
                    wrapper: "justify-end",
                }}
            >
                <NavbarContent>
                    
                </NavbarContent>

                <NavbarContent
                    justify="end"
                    className="data-[justify=end]:flex-grow-0"
                >
                    <UserDropdown />
                </NavbarContent>
            </Navbar>
            <section className="px-20 py-10 my-10 z-[29]">
                {children}
            </section>
        </div>
    );
};
