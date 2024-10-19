"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string[];
  items: string[];
}

export const CollapseItems = ({ icon, items, path, title }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-background text-content1 hover:text-content2 rounded-xl active:scale-[0.98] transition-all duration-150 px-3.5",

            title:
              "px-0 flex text-base text-content1 hover:text-content2 transition-all duration-150 gap-2 h-full items-center cursor-pointer [&_svg_path]:fill-default-400",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-2">
            {items.map((item, index) => (
              <SidebarItem
              title={item}
              key={item + ' ' + index}
              className="mb-2 min-h-[34px]"
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
