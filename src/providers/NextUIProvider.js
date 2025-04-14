"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function UIProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <HeroUIProvider disableRipple>
        {children}
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
