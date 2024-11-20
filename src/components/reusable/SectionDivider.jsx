import React from "react";

const SectionDivider = ({ title, classText = "text-xs" }) => (
  <div className="flex items-center  gap-2">
    <p className={`${classText} xl:text-base`}>{title}</p>
    <div className="w-[10rem] h-[1px] bg-teks "></div>
  </div>
);

export default SectionDivider;
