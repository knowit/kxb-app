import { WithChildren } from "@/types";
import clsx from "clsx";
import * as React from "react";

type TextProps = WithChildren<{
  className?: string;
}>;

const Text = ({ children, className }: TextProps) => {
  return (
    <p className={clsx("leading-5 text-gray-700 dark:text-gray-300 mb-4", className)}>{children}</p>
  );
};

export default Text;
