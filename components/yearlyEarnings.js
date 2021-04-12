import * as React from "react";
import CalculateEarningsInputs from "./calculateEarningsInputs";
import Calendar from "./calendar";

export default function YearlyEarnings() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center">
        <CalculateEarningsInputs />
        <div className="w-full max-w-sm order-first lg:order-last">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
