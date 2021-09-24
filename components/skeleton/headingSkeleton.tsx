import * as React from "react";

const HeadingSkeleton = ({ ...other }) => {
  return <h2 className="bg-gray-400 animate-pulse h-10 w-1/3 mb-8" {...other}></h2>;
};

export default HeadingSkeleton;
