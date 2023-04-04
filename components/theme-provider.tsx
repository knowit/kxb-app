"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

function ThemeProvider({ children, ...other }: ThemeProviderProps) {
  return <NextThemesProvider {...other}>{children}</NextThemesProvider>;
}

export { ThemeProvider };
