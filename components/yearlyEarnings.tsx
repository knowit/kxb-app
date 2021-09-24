import Calendar from "@/components/calendar";
import SalaryStatistics from "@/components/salaryStatistics";
import { UserProfile } from "@/components/user";
import * as React from "react";

export default function YearlyEarnings() {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center w-full mb-12">
      <div className="order-last md:order-first mb-6">
        <UserProfile />
      </div>
      <div className="flex-grow max-w-lg lg:ml-4 mb-6">
        <Calendar />
        <SalaryStatistics />
      </div>
    </div>
  );
}
