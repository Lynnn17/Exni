const Search = () => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 w-full border border-black rounded-md mt-4 md:w-[80%]"
      />
      <button className="bg-[#5641BA] text-white w-full p-2 rounded-md mt-4 md:w-[15%] text-sm md:text-base">
        Search
      </button>
    </div>
  );
};

export default Search;
