import { tv } from "@nextui-org/react";

const colorUser = localStorage.getItem('colorUser')

export const SidebarWrapper = tv({
  base: "bg-background-200 w-0 transition-all h-full fixed -translate-x-full shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col pyb-6 px-3 md:ml-0 md:flex md:static md:h-screen ",

  variants: {
    collapsed: {
      true: "translate-x-0 w-64 ml-0",
    },
  },

});
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100",
});

export const Header = tv({
  base: `flex justify-center text-2xl items-center px-6 py-0 my-0 w-full border-b-1 h-[60px]`,
});

export const Body = tv({
  base: "flex flex-col gap-6 mt-9 px-2",
});

export const Aside = tv({
  base: "transition-all h-screen z-[31] sticky top-0 w-64",
  variants: {
    collapsed: {
      false: "transition-all w-0",
    },
  },
})

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Aside
});