import React from "react";

const SingleSelectCheckboxGroup = ({
  label = "Options",
  options = [],
  selectedValue = "",
  onChange,
}) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="flex flex-row items-center gap-6 space-y-2">
      {label && <p className="text-black w-[8rem] ">{label}</p>}

      {options.map(({ value, label }) => (
        <label
          key={value}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedValue === value}
            onChange={() => handleChange(value)}
            value={value}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            aria-label={label}
          />
          <span className="text-gray-700 text-base">{label}</span>
        </label>
      ))}
    </div>
  );
};

export default SingleSelectCheckboxGroup;
