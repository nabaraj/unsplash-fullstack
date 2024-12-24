import React from "react";
interface TitleProps {
  // Add your props here
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  // Add your component logic here
  return (
    <h3 className='bg-gradient-to-r pb-5 from-orange-300 to-purple-600 bg-clip-text text-transparent font-bold text-4xl inline-block'>
      {children}
    </h3>
  );
};
