import clsx from "clsx";
import * as React from "react";
import { isWorkDay } from "../logic/calendarLogic";

export default function CalendarDay({ day, ...other }) {
  const dayIsWorkDay = React.useMemo(() => isWorkDay(day), [day]);

  return (
    <div
      className={clsx("flex justify-center items-center p-2", {
        "text-green-400": dayIsWorkDay
      })}
      {...other}
    >
      {day?.day}
    </div>
  );
}
