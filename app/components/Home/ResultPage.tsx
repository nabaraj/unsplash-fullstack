"use client";
import React from "react";
import { Search } from "../Search";
interface ResultPageProps {
  // Add your props here
  handleSubmit: (searchString: string) => void;
}

export const ResultPage: React.FC<ResultPageProps> = (props) => {
  // Add your component logic here
  return (
    <div>
      <Search handleSubmit={props.handleSubmit} />
    </div>
  );
};
