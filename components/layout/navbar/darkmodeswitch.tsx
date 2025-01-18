import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@heroui/react";
import { useSidebarContext } from "../layout-context";

export const DarkModeSwitch = () => {
    const { setTheme, resolveTheme } = useSidebarContext();
    return (
        <Switch
            isSelected={resolveTheme === "dark" ? true : false}
            onValueChange={(e) => setTheme(e ? "dark" : "light")}
            startContent={<FontAwesomeIcon icon={faMoon} />}
            endContent={<FontAwesomeIcon icon={faMoon} />}
        />
    );
};
