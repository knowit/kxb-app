import * as React from "react";

const StatisticGroup: React.FC = ({ children }) => {
  return <div className="grid grid-cols-2 gap-4 mb-4">{children}</div>;
};

export default StatisticGroup;
