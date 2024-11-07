import React from "react";

const SectionDivider = ({ title }) => (
  <div className="flex items-center justify-between gap-2">
    <p className="text-xs xl:text-base">{title}</p>
    <div className="w-full h-[1px] bg-teks"></div>
  </div>
);

export default SectionDivider;
