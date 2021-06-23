import { useTheme } from "next-themes";
import * as React from "react";
import { Logo, Moon, Sun } from "./icons";
import Link from "./link";
import { UserNavDetails, useUser } from "./user";

export default function Nav({ userNavDetails = true, ...other }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  return (
    <nav className="flex p-6 w-full max-w-7xl justify-center items-center my-0 min-h-[100px] mx-auto">
      <div className="flex flex-grow">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {user.isAdmin && (
        <div className="hidden md:flex items-center ml-6">
          <Link href="/salary-calculator">Salary calculator</Link>
        </div>
      )}
      {userNavDetails && <UserNavDetails />}
      <div className="flex items-center ml-6">
        <button
          type="button"
          aria-label="Toggle color mode"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? theme === "light" ? <Moon /> : <Sun /> : <div className="h-6 w-6"></div>}
        </button>
      </div>
    </nav>
  );
}
