import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/actions/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

export const UserDropdown = () => {
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        await deleteAuthCookie();
        router.replace("/login");
    }, [router]);

    return (
        <Dropdown className="bg-background-200">
            <NavbarItem>
                <DropdownTrigger>
                    <Avatar
                        as='button'
                        color='secondary'
                        size='md'
                        src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                    />
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label='User menu actions'
                onAction={(actionKey) => console.log({ actionKey })}>
                <DropdownItem className='data-[hover=true]:bg-background-200 cursor-default text-content1' key='profile' startContent={<FontAwesomeIcon icon={faUser} />}>Usuario: Juanchi</DropdownItem>
                <DropdownItem className="data-[hover=true]:bg-background-300 text-content1" key='configurations' startContent={<FontAwesomeIcon icon={faGear} />}>Configuración</DropdownItem>
                <DropdownItem
                    key='logout'
                    color='danger'
                    className='text-danger'
                    onPress={handleLogout}
                    startContent={
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    }>
                    Log Out
                </DropdownItem>
                <DropdownItem className="data-[hover=true]:bg-background-300" key='switch'>
                    <DarkModeSwitch />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
