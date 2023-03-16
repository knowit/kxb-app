"use client";

import { THEME_CONSTANTS } from "@/constants/theme-constants";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { FC, forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ThemeSelectIcon: FC<{ theme: string }> = ({ theme }) => {
  switch (theme) {
    case THEME_CONSTANTS.LIGHT.value:
      return <SunIcon className="h-4 w-4" />;
    case THEME_CONSTANTS.DARK.value:
      return <MoonIcon className="h-4 w-4" />;
    case THEME_CONSTANTS.SYSTEM.value:
      return <DesktopIcon className="h-4 w-4" />;
    default:
      return <DesktopIcon className="h-4 w-4" />;
  }
};

const ThemeSelect = forwardRef<
  ElementRef<typeof SelectTrigger>,
  ComponentPropsWithoutRef<typeof SelectTrigger>
>(({ className, ...other }, forwardedRef) => {
  const { theme: selectedTheme, setTheme } = useTheme();
  return (
    <Select
      defaultValue={selectedTheme ?? THEME_CONSTANTS.SYSTEM.value}
      onValueChange={value => {
        console.log(value);
        setTheme(value);
      }}
    >
      <SelectTrigger className={cn("max-w-[8rem]", className)} {...other} ref={forwardedRef}>
        <SelectValue placeholder={selectedTheme ?? "System"} />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent>
        {Object.values(THEME_CONSTANTS).map(theme => (
          <SelectItem key={theme.value} value={theme.value}>
            <div className="flex items-center gap-3">
              <ThemeSelectIcon theme={theme.value} />
              {theme.i18n.no}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

ThemeSelect.displayName = "ThemeSelect";

export { ThemeSelect };
