import React from "react";

const DetailInfo = ({ label, value }) => (
  <div>
    <p>{label}</p>
    <p className="text-teks text-sm">{value}</p>
  </div>
);

export default DetailInfo;
