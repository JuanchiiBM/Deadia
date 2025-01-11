import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarItem, useDisclosure } from "@nextui-org/react";
import React, { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/actions/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalNavbar from "./modal";
import { faRightFromBracket, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

export const UserDropdown = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = useCallback(async () => {
        await deleteAuthCookie();
        router.replace("/login");
    }, [router]);

    return (
        <>
            <Dropdown className="bg-background-200">
                <NavbarItem>
                    <DropdownTrigger>
                        <Avatar
                            as='button'
                            size='md'
                            name="Juanchi"
                            className="bg-primary-200 dark:bg-primary-700"
                            classNames={{base: 'border-2 border-primary-200 dark:border-primary-700'}}
                        />
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label='User menu actions'>
                    <DropdownItem className='data-[hover=true]:bg-background-200 cursor-default text-content1' key='profile' startContent={<FontAwesomeIcon icon={faUser} />}>Usuario: Juanchi</DropdownItem>
                    <DropdownItem onPress={() =>  onOpen()} className="data-[hover=true]:bg-background-300 text-content1" key='configurations' startContent={<FontAwesomeIcon icon={faGear} />}>Configuración</DropdownItem>
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
            <ModalNavbar isOpen={isOpen} onClose={onClose} />
        </>
    );
};
