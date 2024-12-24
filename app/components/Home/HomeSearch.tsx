"use client";

import React from "react";
import { Search } from "../Search";
interface HomeSearchProps {
  // Add your props here
  handleSubmit: (searchString: string) => void;
  isImageFound: boolean;
}

export const HomeSearch: React.FC<HomeSearchProps> = (props) => {
  // Add your component logic here

  return (
    <div className={`align-middle pb-20 col-span-3 `}>
      {!props.isImageFound ? (
        <div className='text-center'>
          <h3 className='text-4xl pb-4 font-bold'>Search</h3>
          <p className='pb-4'>Search high-resolution images from Unsplash</p>
        </div>
      ) : (
        <div className='resultFound pt-[74px] mb-[-35px]'></div>
      )}
      <div className='px-4'>
        <Search handleSubmit={props.handleSubmit} />
      </div>
    </div>
  );
};
