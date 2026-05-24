"use client";

import { createContext, useContext, useState } from "react";

type NavbarMenuContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

const NavbarMenuContext = createContext<NavbarMenuContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

export function NavbarMenuProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <NavbarMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </NavbarMenuContext.Provider>
  );
}

export function useNavbarMenu() {
  return useContext(NavbarMenuContext);
}