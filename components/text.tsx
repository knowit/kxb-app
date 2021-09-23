import clsx from "clsx";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<Props> = ({ children, className }) => {
  return (
    <p className={clsx("leading-5 text-gray-700 dark:text-gray-300 mb-4", className)}>{children}</p>
  );
};

export default Text;
