import { CollectionType, PhotoType } from "@/types";
import Link from "next/link";
import React from "react";
interface CollectionGridItemsProps {
  // Add your props here
  collectionDetails: CollectionType;
}

export const CollectionGridItems: React.FC<CollectionGridItemsProps> = ({
  collectionDetails
}) => {
  // Add your component logic here
  const { title, total_photos, preview_photos, id } = collectionDetails;
  const getGridComponent = (photos: PhotoType[]) => {
    const className = "group-hover:opacity-80";
    switch (photos.length) {
      case 1:
        return (
          <div
            className={`bg-cover bg-center h-64 rounded-md ${className}`}
            style={{ backgroundImage: `url(${photos[0].urls.regular})` }}
          ></div>
        );
        break;
      case 2:
        return (
          <div className='grid grid-cols-2 h-64 rounded-md overflow-hidden gap-1'>
            <div
              className={`h-full bg-cover bg-center ${className}`}
              style={{ backgroundImage: `url(${photos[0].urls.regular})` }}
            ></div>
            <div
              className={`h-full bg-cover bg-center ${className}`}
              style={{ backgroundImage: `url(${photos[1].urls.regular})` }}
            ></div>
          </div>
        );
        break;
      default:
        return (
          <div className='grid grid-cols-4 h-64 rounded-md overflow-hidden gap-1'>
            <div
              className={`bg-cover bg-center row-span-2 col-span-3 h-full ${className}`}
              style={{ backgroundImage: `url(${photos[0].urls.regular})` }}
            ></div>
            <div
              className={`bg-cover bg-center col-span-1 ${className}`}
              style={{ backgroundImage: `url(${photos[1].urls.regular})` }}
            ></div>
            <div
              className={`bg-cover bg-center col-span-1 ${className}`}
              style={{ backgroundImage: `url(${photos[2].urls.regular})` }}
            ></div>
          </div>
        );
    }
  };
  return (
    <div className='flex flex-col'>
      <Link href={`/collections/${id}/${title}`} className='mb-3 group'>
        {getGridComponent(preview_photos)}
      </Link>
      <div>
        <h3 className='text-base font-medium capitalize'>{title}</h3>
        <span className='text-xs text-[#aca8a8]'>
          {total_photos} {total_photos > 1 ? "photo" : "photos"}
        </span>
      </div>
    </div>
  );
};
