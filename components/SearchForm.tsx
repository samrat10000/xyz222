// "use client";
// import { useGlobalContext } from "@/context/globalContext";
// import { search } from "@/utils/Icons";
// import React from "react";

// function SearchForm() {
//   const { searchQuery, handleSearchChange } = useGlobalContext();

//   return (
//     <form className="relative w-[80%] md:w-[50%]">
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         placeholder="Search Pokemon!"
//         className="u-shadow-1 w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-800"
//       />
//       <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-gray-300 pointer-events-none">
//         {search}
//       </span>
//     </form>
//   );
// }

// export default SearchForm;


"use client";
import React from 'react';
import { useGlobalContext } from "@/context/globalContext";
import { Search, Sparkles } from 'lucide-react';

const SearchForm = () => {
  const { searchQuery, handleSearchChange } = useGlobalContext();

  return (
    <div className="relative w-[80%] md:w-[50%] group">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-2xl blur-xl opacity-70 animate-pulse"/>
      
      <form className="relative">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Pokemon!"
            className="
              w-full 
              py-4 
              px-12
              rounded-2xl
              text-lg 
              outline-none 
              border-2
              border-pink-200
              bg-white/80
              backdrop-blur-md
              text-gray-700
              placeholder:text-pink-400
              transition-all
              duration-300
              focus:border-purple-300
              focus:ring-4
              focus:ring-pink-100
              hover:border-purple-200
              shadow-lg
              hover:shadow-xl
              hover:shadow-pink-100/50
            "
          />
          
          <Search 
            className="
              absolute 
              left-4 
              text-pink-400
              w-5 
              h-5
              transition-colors
              duration-300
              group-focus-within:text-purple-400
            "
          />
          
          <Sparkles 
            className="
              absolute 
              right-4 
              text-purple-300
              w-5 
              h-5
              transition-all
              duration-300
              group-hover:rotate-12
              group-hover:scale-110
              group-focus-within:text-pink-400
            "
          />
        </div>
      </form>
      
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-3xl -z-10 opacity-50"/>
    </div>
  );
};

export default SearchForm;