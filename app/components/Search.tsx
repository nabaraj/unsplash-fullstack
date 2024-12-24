import Image from "next/image";
import React, { useEffect, useState } from "react";
interface SearchProps {
  // Add your props here
  handleSubmit: (searchString: string) => void;

  // Add your props here
}

export const Search: React.FC<SearchProps> = ({ handleSubmit }) => {
  // Add your component logic here
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search && search.length === 0) {
      console.log("effect");
      handleSubmit(search);
    }
  }, [search, handleSubmit]);
  return (
    <form className='max-w-xl mx-auto'>
      <div className='relative'>
        <input
          type='text'
          id='default-search'
          className='block w-full p-4 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Enter your keywards...'
          required
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className='absolute inset-y-0 end-0 right-0 flex items-center pe-3'>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(search);
            }}
            className=''
          >
            <Image src='./images/Search.svg' width='24' height='24' alt='' />
          </button>
        </div>
      </div>
    </form>
  );
};
