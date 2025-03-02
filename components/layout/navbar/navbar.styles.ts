import { tv } from "@nextui-org/react";

// NEEDS TO BE REFACTORED

export const StyledBurgerButton = tv({
  base: "ml-4 my-[15px] h-[30px] fixed flex flex-col justify-around w-6 bg-transparent border-none cursor-pointer padding-0 z-[40] focus:outline-none [&_div]:w-6 [&_div]:h-px [&_div]:bg-default-900 [&_div]:rounded-xl  [&_div]:transition-all  [&_div]:relative  [&_div]:origin-[1px] ",

  variants: {
    open: {
      true: "[&",
    },
  },
});

export const NavbarStyle = tv({
  base: "w-full transition-transform relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden justify-start",
  variants: {
    collapsed: {
      true: "[&",
    },
  },
});