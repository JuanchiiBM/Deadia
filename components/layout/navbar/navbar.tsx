import { Input, Link, Navbar, NavbarContent } from "@heroui/react";
import React, { useEffect } from "react";
import { NavbarStyle } from "./navbar.styles";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";

interface Props {
    children: React.ReactNode;
}

const colorUser = localStorage.getItem('colorUser')

export const NavbarWrapper = ({ children }: Props) => {
    let loadAgain = 0

    useEffect(() => {
        loadAgain = 1
    }, [colorUser])
    return (
        <div className={NavbarStyle()}>
            <BurguerButton />
            <Navbar
                isBordered
                key={loadAgain}
                style={{ boxShadow: `inset 0px 5px 5px 0px #${colorUser}`}}
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
            <section className="px-10 py-10 my-10 z-[29] dashboard">
                {children}
            </section>
        </div>
    );
};
