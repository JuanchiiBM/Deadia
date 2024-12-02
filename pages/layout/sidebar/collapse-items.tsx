import React from "react";
import { ChevronDownIcon } from "@/components/icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { faCircleDot, faUserGraduate, faMoneyBillTransfer, faGears, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

interface Props {
    icon: number;
    title: string;
    path: string[];
    items: string[];
}

export const CollapseItems = ({ icon, items, path, title }: Props) => {
    const pathname = usePathname();

    const icons = (icon: number) => {
        switch (icon) {
            case 1:
                return faUserGraduate
            case 2:
                return faMoneyBillTransfer
            case 3:
                return faGears
            case 4:
                return faBoxesStacked
        }
        return faCircleDot
    }

    return (
        <div className="flex gap-4 h-full items-center cursor-pointer">
            <Accordion className="px-0">
                <AccordionItem
                    indicator={<ChevronDownIcon />}
                    classNames={{
                        indicator: "data-[open=true]:-rotate-180",
                        trigger:
                            "py-0 min-h-[44px] hover:bg-background text-content1 hover:text-content2 rounded-xl active:scale-[0.98] transition-all duration-150 px-2",

                        title:
                            "px-0 flex text-base text-content1 hover:text-content2 transition-all duration-150 gap-2 h-full items-center cursor-pointer [&_svg_path]:fill-default-400",
                    }}
                    aria-label="Accordion 1"
                    title={
                        <div className="flex flex-row gap-2">
                            <span><FontAwesomeIcon icon={icons(icon)} /></span>
                            <span>{title}</span>
                        </div>
                    }
                >
                    <div className="pl-4">
                        {items.map((item, index) => (
                            <SidebarItem
                                title={item}
                                key={item + ' ' + index}
                                className="mb-2 py-1 text-sm"
                                icon={<FontAwesomeIcon icon={faCircleDot} />}
                                isActive={pathname === `${path[index]}`}
                                href={path[index]}
                            />
                        ))}
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
