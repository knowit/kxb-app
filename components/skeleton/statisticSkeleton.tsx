import * as React from "react";

const StatisticSkeleton = ({ ...other }) => {
  return (
    <div className="w-full" {...other}>
      <div className="w-full">
        <div className="h-full overflow-hidden">
          <div className="pt-2">
            <h2 className="bg-gray-400 animate-pulse h-8 w-2/3"></h2>
            <p className="leading-relaxed mb-4 w-2/3 h-3 animate-pulse bg-transparent"></p>
            <p className="leading-relaxed mb-4 w-full h-3 animate-pulse bg-gray-400"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticSkeleton;
