import clsx from "clsx";
import React from "react";

const InnerBox = ({ children, title, className }) => {
  return (
    <div className={clsx("flex flex-col gap-[8px]", className)}>
      <div className="flex bg-white text-[16px] font-bold text-center leading-[18px] justify-center items-center h-[42px] rounded-t-[14px]">
        {title}
      </div>
      <div className="bg-white rounded-b-[14px] py-[16px] flex-1">
        {children}
      </div>
    </div>
  );
};

export default InnerBox;
