import clsx from "clsx";
import * as React from "react";

type TextFieldProps = {
  id: string;
  label: string;
  labelProps?: any;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: (...params: any) => void;
  type?: string;
  step?: string;
  min?: string;
} & React.HtmlHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, labelProps = {}, disabled = false, type = "text", ...other }, ref) => {
    return (
      <div
        className={clsx("flex items-center", {
          "opacity-50 cursor-not-allowed": disabled
        })}
      >
        <label className="block text-sm text-gray-900 dark:text-gray-100" htmlFor={id}>
          <span {...labelProps}>{label}</span>
          <input
            className="px-4 py-2 mt-1 my-6 text-base focus:ring-green-500 border focus:border-green-500 block w-full border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            id={id}
            ref={ref}
            disabled={disabled}
            {...other}
          />
        </label>
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
