import { FC } from "react";

type CalendarMonthLegendProps = {};

const CalendarMonthLegend: FC<CalendarMonthLegendProps> = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-2">
        <div className="h-3 w-3 rounded-full border-neutral-50 bg-neutral-50" />
        <span className="text-xs">Off work</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="h-3 w-3 rounded-full border-emerald-500 bg-emerald-500" />
        <span className="text-xs">Work</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="h-3 w-3 rounded-full border-red-500 bg-red-500" />
        <span className="text-xs">Non commissioned</span>
      </div>
    </div>
  );
};

export { CalendarMonthLegend };
export type { CalendarMonthLegendProps };
