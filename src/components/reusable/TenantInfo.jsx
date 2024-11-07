import React from "react";

const TenantInfo = ({ label, value }) => (
  <div>
    <p className="text-sm xl:text-lg">{label}</p>
    <p className="text-xs xl:text-base text-teks">{value}</p>
  </div>
);

export default TenantInfo;
