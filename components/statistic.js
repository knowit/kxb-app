import * as React from "react";
import StatisticSkeleton from "./skeleton/statisticSkeleton";

export default function Statistic({ title, value, isLoading = false }) {
  return isLoading ? (
    <StatisticSkeleton />
  ) : (
    <div className="bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow transform transition-all w-full">
      <div className="bg-white dark:bg-gray-900 p-3 md:p-5">
        <div className="sm:flex sm:items-start">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            <h3 className="text-xs md:text-sm leading-6 font-medium text-gray-400">{title}</h3>
            <p className="text-lg md:text-2xl font-bold text-black dark:text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
