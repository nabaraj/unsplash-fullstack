"use client";
import React, { useState } from "react";
import { HomeSearch } from "./HomeSearch";
import { MasonryGrid } from "../Image-listing/MasonryGrid";
import "./homepage-wrapper.css";

export const HomePageWrapper: React.FC = () => {
  // Add your component logic here
  const [results, setResult] = useState([]);
  const [total, setTotal] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  const handleSubmit = async (search: string) => {
    console.log("***** ", search);
    // if (search.trim().length > 0) {
    try {
      const response = await fetch(`/api/search?keywards=${search}`); // Accessing the API route
      console.log({ response });

      if (!response.ok) {
        setResult([]);
        setTotal(0);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const { results = [], total = 0 } = data.images || {};
      setResult(results);
      setTotal(total);
    } catch (err) {
      console.log(err);
    }
    // }
    // setTotalPages(total_pages);
  };

  const isResultFound = () => (!results || results.length == 0 ? false : true);
  const resultClass = isResultFound() ? "" : "flex flex-col justify-center";
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center overflow-auto ${
        isResultFound() ? "" : "bg-homepage fixed"
      }`}
    >
      <div className='grid w-full'>
        <HomeSearch handleSubmit={handleSubmit} isImageFound={total > 0} />
      </div>
      {results && (
        <div className={`container px-4 mx-auto ${resultClass} pb-48`}>
          <MasonryGrid images={results} />
        </div>
      )}
    </div>
  );
};
