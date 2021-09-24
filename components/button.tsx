import clsx from "clsx";
import * as React from "react";

type ButtonProps = {
  className?: string;
  variant?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
} & React.HtmlHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...other
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "inline-block px-6 py-2 font-medium leading-6 text-center  uppercase transition  rounded shadow ripple hover:shadow-lg  focus:outline-none duration-300",
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
};

export default Button;
