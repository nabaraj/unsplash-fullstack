import { GenericImage } from "@/types/api-response";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MasonryProps<T> {
  images: GenericImage[]; // Use the generic type
  columns?: number; // Number of columns in the masonry grid
}

export const MasonryGrid = <T extends Record<string, unknown>>({
  images,
  columns = 4
}: MasonryProps<T>) => {
  // Create columns dynamically
  const columnArray: GenericImage[][] = Array.from(
    { length: columns },
    () => []
  );
  console.log({ images, columnArray });
  // Distribute images into columns
  images.forEach((image, index) => {
    columnArray[index % columns].push(image);
  });

  return (
    <div>
      <div className={`grid grid-cols-4 md:grid-cols-${columns} gap-4`}>
        {columnArray.map((col, colIndex) => (
          <div key={colIndex} className='flex flex-col gap-4'>
            {col.map((img) => (
              <div key={img.id}>
                <Link href={`/image/${img.id}`}>
                  <Image
                    className='h-auto max-w-full rounded-lg !static cursor-pointer'
                    src={img.urls.regular}
                    fill={true}
                    alt={img.alt_description || "Image"}
                  />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
