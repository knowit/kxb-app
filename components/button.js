import clsx from "clsx";
import * as React from "react";

export default function Button({ children, className, ...other }) {
  return (
    <button
      className={clsx(
        "inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition bg-green-500 dark:bg-green-400 rounded shadow ripple hover:shadow-lg hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none",
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
}
