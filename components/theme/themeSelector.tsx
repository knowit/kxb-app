import { stringToTitleCase } from "@/utils/commonUtils";
import { useTheme } from "next-themes";
import * as React from "react";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import {
  IoCheckmark,
  IoChevronDown,
  IoChevronUp,
  IoMoonOutline,
  IoSunnyOutline
} from "react-icons/io5";
import { CSS } from "stitches.config";
import {
  Flex,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  Svg
} from "../ui";

const SelectValueIcon = ({ theme }) => {
  const Icon = React.useMemo(() => {
    switch (theme) {
      case "dark":
        return IoMoonOutline;
      case "light":
        return IoSunnyOutline;
      case "system":
        return HiOutlineDesktopComputer;
      default:
        return HiOutlineDesktopComputer;
    }
  }, [theme]);

  return <Svg as={Icon} size="2" variant="text" />;
};

const ThemeSelect = ({
  theme,
  setTheme,
  themes = [],
  ...other
}: {
  theme: string;
  setTheme: (newThemeValue: string) => void;
  themes: string[];
  css?: CSS;
}) => {
  return (
    <Select
      name="theme-select"
      defaultValue={theme}
      value={theme}
      onValueChange={value => setTheme(value)}
    >
      <SelectTrigger
        aria-label="Select Theme"
        css={{
          width: "$themeSelect",
          justifyContent: "space-between"
        }}
      >
        <SelectValueIcon theme={theme} />
        <SelectValue />
        <SelectIcon>
          <IoChevronDown />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent portal>
        <SelectScrollUpButton>
          <IoChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectGroup>
            <SelectLabel>Theme</SelectLabel>
            {themes.map(theme => (
              <SelectItem key={`next-theme-${theme}`} value={theme}>
                <SelectItemText>{stringToTitleCase(theme)}</SelectItemText>
                <SelectItemIndicator>
                  <IoCheckmark />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectViewport>
        <SelectScrollDownButton>
          <IoChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </Select>
  );
};

const ThemeSelector = ({ showLabel = false, ...other }: { showLabel?: boolean; css?: CSS }) => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Flex alignItems="center" gap="3" {...other}>
      {showLabel ? <Label htmlFor="theme-select">Theme</Label> : null}
      <ThemeSelect theme={theme} setTheme={setTheme} themes={themes} />
    </Flex>
  );
};

export default ThemeSelector;
