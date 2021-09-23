import Card from "@/components/card";
import StatisticSkeleton from "@/components/skeleton/statisticSkeleton";
import * as React from "react";

interface Props {
  title: string;
  value: string | number;
  isLoading?: boolean;
}

const Statistic: React.FC<Props> = ({ title, value, isLoading = false }) => {
  return isLoading ? (
    <StatisticSkeleton />
  ) : (
    <Card>
      <div className="sm:flex sm:items-start">
        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
          <h3 className="text-xs md:text-sm leading-6 font-medium text-gray-400">{title}</h3>
          <p className="text-md md:text-2xl font-bold text-black dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default Statistic;
