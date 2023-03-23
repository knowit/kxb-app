"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...other }: ThemeProviderProps) {
  return <NextThemesProvider {...other}>{children}</NextThemesProvider>;
}
