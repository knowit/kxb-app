import * as React from "react";

const TextField = React.forwardRef(function TextField({ id, label, ...other }, ref) {
  return (
    <div className="flex items-center">
      <label className="block text-sm text-gray-900 dark:text-gray-100" htmlFor={id}>
        <span>{label}</span>
        <input
          className="px-4 py-2 mt-1 my-6 focus:ring-blue-500 border focus:border-blue-500 block w-full border-gray-900 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          id={id}
          ref={ref}
          {...other}
        />
      </label>
    </div>
  );
});

export default TextField;
