import * as React from "react";

export default function TextField({ id, initialValue, onChange, label, ...other }) {
  const [value, setValue] = React.useState(initialValue);

  return (
    <div>
      <label className="block text-sm text-gray-900 dark:text-gray-100" htmlFor={id}>
        {label}
      </label>
      <input
        className="px-4 py-2 mt-1 my-6 focus:ring-blue-500 border focus:border-blue-500 block w-full border-gray-900 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        id={id}
        value={value}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        {...other}
      />
    </div>
  );
}
