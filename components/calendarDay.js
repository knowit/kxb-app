import { isWorkDay } from "@/logic/calendarLogic";
import clsx from "clsx";
import * as React from "react";

export default function CalendarDay({ day, ...other }) {
  const dayIsWorkDay = React.useMemo(() => isWorkDay(day), [day]);

  return (
    <div
      className={clsx("flex justify-center items-center p-2", {
        "text-green-500 dark:text-green-400 font-bold": dayIsWorkDay
      })}
      {...other}
    >
      {day?.day}
    </div>
  );
}
