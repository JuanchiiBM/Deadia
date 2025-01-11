import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
    const { setTheme, resolvedTheme } = useNextTheme();
    return (
        <Switch
            isSelected={resolvedTheme === "dark" ? true : false}
            onValueChange={(e) => setTheme(e ? "dark" : "light")}
            startContent={<FontAwesomeIcon icon={faMoon} />}
            endContent={<FontAwesomeIcon icon={faMoon} />}
        />
    );
};
