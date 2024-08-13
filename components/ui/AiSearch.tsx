"use client";

import { useState } from "react";

import { GoSearch } from "react-icons/go";

const SearchBar = ({ onSearchInput }: any) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearchInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the search query
    console.log(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearchInput("");
  };

  return (
    <div className="relative  w-full flex justify-center items-center md:mx-auto m-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center sm:w-[240px]  w-[230px] md:w-[350px] rounded-md  bg-gray-800 text-white  shadow-lg  overflow-hidden transition-transform duration-300 ease-in-out transform"
      >
        <GoSearch className="w-5 h-5 ml-4" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="w-full px-2 py-4 border-none text-white  bg-transparent focus:outline-none"
        />
      </form>
    </div>
  );
};

export default SearchBar;
