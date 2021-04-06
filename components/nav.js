import { useTheme } from "next-themes";
import * as React from "react";
import { useClickAway } from "react-use";
import { useCalendar } from "../utils/calendarProvider";
import Link from "./link";

export default function Nav() {
  const { year, years, months } = useCalendar();

  const [open, setOpen] = React.useState(false);

  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  return (
    <nav className="flex">
      <div className="flex overflow-x-scroll">
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
        <ul className="flex">
          {years?.map(year => (
            <li key={`styled-item-year-${year}`}>
              <Link className="p-2" href="/year/[year]" as={`/year/${year}`}>
                {year}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex">
          {months?.map(month => (
            <li key={`styled-item-year-${year?.year}-month-${month}`}>
              <Link
                className="p-2"
                href="/year/[year]/[month]"
                as={`/year/${year?.year}/${month?.toLowerCase()}`}
              >
                {month?.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
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
          ) : null}
        </button>
      </div>
    </nav>
  );
}