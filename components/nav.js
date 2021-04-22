import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/client";
import { useTheme } from "next-themes";
import * as React from "react";
import { useSalary } from "../utils/salaryProvider";
import Button from "./button";
import Link from "./link";
import { UserAvatar } from "./user";

export default function Nav() {
  const [mounted, setMounted] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [session, loading] = useSession();

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  const { nextPayDayStatistics } = useSalary();

  return (
    <nav className="flex p-6 w-full max-w-7xl justify-center items-center my-0 mx-auto">
      <div className="flex overflow-x-scroll flex-grow">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>
      <div className="flex items-center ml-6 items-end">
        <div className="ml-6">
          <div className="text-xs text-gray-500 dark:text-gray-400">Next paycheck</div>
          <div className="text-xs">{nextPayDayStatistics.payDay}</div>
          <div className="text-sm font-bold text-green-500 dark:text-green-400">
            {nextPayDayStatistics.net}
          </div>
        </div>
      </div>
      <div className="flex items-center ml-6">
        <button
          type="button"
          aria-label="Toggle color mode"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? (
            theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )
          ) : (
            <div className="h-6 w-6"></div>
          )}
        </button>
      </div>
      <div className="flex items-center ml-6">
        <div className="w-12 h-12 relative">
          <button className="cursor-pointer" onClick={() => setShowUserMenu(prev => !prev)}>
            <UserAvatar />
          </button>
          <motion.div
            className="absolute dark:bg-gray-900 right-0 mt-2 rounded-md shadow-lg overflow-hidden z-20 min-w-[200px]"
            initial={showUserMenu ? "open" : "collapsed"}
            animate={showUserMenu ? "open" : "collapsed"}
            variants={{
              open: {
                opacity: 1,
                height: "auto"
              },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{
              ease: "easeOut"
            }}
          >
            <div className="flex flex-col p-6">
              <Link className="mb-4" href="/profile">
                Profile
              </Link>
              {!session && <Button onClick={() => signIn()}>Login</Button>}
              {session && <Button onClick={() => signOut()}>Logout</Button>}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
