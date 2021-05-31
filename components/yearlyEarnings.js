import * as React from "react";
import CalculateEarningsInputs from "./calculateEarningsInputs";
import Calendar from "./calendar";
import SalaryStatistics from "./salaryStatistics";
import { UserProfile } from "./user";

export default function YearlyEarnings() {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center w-full">
      <div className="order-last md:order-first mb-6">
        <UserProfile />
        <CalculateEarningsInputs />
      </div>
      <div className="flex-grow max-w-lg lg:ml-4 mb-6">
        <Calendar />
        <SalaryStatistics />
      </div>
    </div>
  );
}
