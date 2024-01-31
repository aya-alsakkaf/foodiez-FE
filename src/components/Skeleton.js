import React from "react";

const Skeleton = ({ className, children }) => {
  return (
    <div className="animate-pulse ">
      <div className={`bg-gray-200 rounded ${className}`}>{children}</div>
    </div>
  );
};

export default Skeleton;
