import * as React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow transform transition-all w-full">
      <div className="bg-white dark:bg-gray-900 p-3 md:p-5">{children}</div>
    </div>
  );
}
