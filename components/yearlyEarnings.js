import * as React from "react";
import CalculateEarningsInputs from "./calculateEarningsInputs";
import Calendar from "./calendar";
import SalaryStatistics from "./salaryStatistics";
import { UserProfile } from "./user";

export default function YearlyEarnings() {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center w-full">
      <div>
        <UserProfile />
        <CalculateEarningsInputs />
      </div>
      <div className="flex-grow max-w-lg ml-4">
        <Calendar />
        <SalaryStatistics />
      </div>
    </div>
  );
}
