import clsx from "clsx";
import * as React from "react";

export default function CalendarDay({
  text,
  isWorkDay = false,
  isNonCommissionedToggled = false,
  ...other
}) {
  return (
    <div
      className={clsx("flex justify-center items-center p-2 cursor-pointer", {
        "text-green-500 dark:text-green-400 font-bold": isWorkDay,
        "text-red-500 dark:text-red-400 font-bold": isNonCommissionedToggled
      })}
      {...other}
    >
      {text}
    </div>
  );
}
