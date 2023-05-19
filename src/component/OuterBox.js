import clsx from "clsx";
import React from "react";

const OuterBox = ({ title, children, className }) => {
  return (
    <div
      className={clsx(
        "bg-primary p-[24px] rounded-[24px] flex flex-col gap-[24px]",
        className
      )}
    >
      <h4 className="text-white flex justify-center items-center gap-[12px] text-[28px] font-bold before:content-[''] before:bg-white before:w-[90px] before:h-[1px] before:flex after:content-[''] after:bg-white after:w-[90px] after:h-[1px] after:flex">
        {title}
      </h4>
      {children}
    </div>
  );
};

export default OuterBox;
