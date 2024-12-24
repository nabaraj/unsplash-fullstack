import Image from "next/image";
import React from "react";
interface CollectionListItemProps {
  // Add your props here
  url: string;
  title: string;
  total: number;
  children: React.ReactNode;
  verticle?: string;
  className?: string;
  onClickHandler?: () => void;
}

export const CollectionListItem: React.FC<CollectionListItemProps> = ({
  title,
  url,
  total,
  children,
  className = "",
  onClickHandler
}) => {
  // Add your component logic here
  const handleOnClick = () => {
    if (onClickHandler) {
      onClickHandler();
    }
  };
  return (
    <div
      className={`p-3 hover:bg-gray-200 flex mb-3 cursor-pointer rounded-md justify-between items-center ${className}`}
      onClick={handleOnClick}
    >
      <div className='flex'>
        <div className='pr-3'>
          <Image
            src={url}
            width={80}
            height={80}
            alt={title}
            className='rounded-md aspect-square'
          ></Image>
        </div>
        <div>
          <div className='text-lg font-bold'>{title}</div>
          {total} photos
        </div>
      </div>
      {children}
    </div>
  );
};
