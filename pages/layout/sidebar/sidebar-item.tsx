import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout-context";
import clsx from "clsx";

interface Props {
    title: string;
    icon: React.ReactNode;
    isActive?: boolean;
    className?: string;
    href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "", className }: Props) => {
    const { collapsed, setCollapsed } = useSidebarContext();

    const handleClick = () => {
        if (window.innerWidth < 768) {
            setCollapsed();
        }
    };
    return (
        <NextLink
            href={href}
            className="text-default-900 active:bg-none max-w-full"
        >
            <div
                className={clsx(
                    isActive
                    ? "bg-primary-200 dark:bg-primary-700 [&_svg_path]:fill-primary-700 dark:[&_svg_path]:fill-primary-50"
                    : "hover:bg-background [&_svg_path]:fill-default-400",
                    `${className} flex gap-2 w-full py-2 h-full items-center px-2 rounded-lg cursor-pointer text-content1 hover:text-content2 transition-all duration-150 active:scale-[0.98]`
                )}
                onClick={handleClick}
            >
                {icon}
                <span className="">{title}</span>
            </div>
        </NextLink>
    );
};
