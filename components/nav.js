import { Logo, Moon, Sun } from "@/components/icons";
import Link from "@/components/link";
import { UserNavDetails, useUser } from "@/components/user";
import { useTheme } from "next-themes";
import * as React from "react";

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
      {user?.isAdmin && (
        <div className="hidden md:flex items-center ml-4 md:ml-6">
          <Link href="/salary-calculator">Salary calculator</Link>
        </div>
      )}
      <div className="hidden md:flex items-center ml-4 md:ml-6">
        <Link href={`/user/${user?.id}`}>My overview</Link>
      </div>
      {userNavDetails && <UserNavDetails />}
      <div className="flex items-center ml-4 md:ml-6">
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
