import React, { useState } from "react";

const Search = ({
  placeholder = "Search...",
  buttonText = "Search",
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Memanggil fungsi pencarian dari props
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="px-3 py-2 w-full border border-black rounded-md mt-4 md:w-[80%]"
      />
      <button
        type="submit"
        className="bg-[#5641BA] text-white w-full p-2 rounded-md mt-4 md:w-[15%] text-sm md:text-base"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Search;
