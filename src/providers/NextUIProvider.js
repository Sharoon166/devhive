"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function UIProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <NextUIProvider disableRipple>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}
