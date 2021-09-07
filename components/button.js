import clsx from "clsx";
import * as React from "react";

export default function Button({ children, className, variant = "primary", ...other }) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-block px-6 py-2 text-xs font-medium leading-6 text-center  uppercase transition  rounded shadow ripple hover:shadow-lg  focus:outline-none duration-300",
        {
          "text-black bg-green-500 dark:bg-green-400 hover:bg-green-600 dark:hover:bg-green-700":
            variant === "primary",
          "text-white bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-700":
            variant === "secondary",
          "text-black bg-red-500 dark:bg-red-400 hover:bg-red-600 dark:hover:bg-red-700":
            variant === "red"
        },
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
}
