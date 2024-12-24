"use client";
import { MasonryGrid } from "@/app/components";
import { Title } from "@/app/components/title/Title";
import { GenericImage } from "@/types";
import React, { useEffect, useState } from "react";
interface CollectionImagesProps {
  // Add your props here
}

const CollectionImages: React.FC<{
  params: Promise<{ id: string; title: string }>;
}> = ({ params }) => {
  const { id, title } = React.use(params);
  const [images, setImages] = useState([] as GenericImage[]);
  const [isLoading, setIsLoading] = useState(false);

  const getImages = async () => {
    try {
      setIsLoading(true);
      const collectionImages = await fetch(
        `/api/getCollectionImages?collectionId=${id}`
      );
      const allImages = await collectionImages.json();
      console.log({ allImages });
      setIsLoading(false);
      setImages(allImages.images);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setImages([]);
    }
  };
  useEffect(() => {
    getImages();
  }, []);
  console.log({ images });
  return (
    <div className={`container px-4 mx-auto`}>
      <div className='text-center pt-10'>
        <Title>
          <span className='capitalize'>{title}</span>
        </Title>
        <div></div>
        <p className='max-w-md inline-block pb-10'>
          {isLoading
            ? "Loading"
            : `${images.length} ${images.length > 1 ? "photos" : "photo"}`}
        </p>
      </div>

      {images && (
        <div>
          <MasonryGrid images={images} />
        </div>
      )}
    </div>
  );
};
export default CollectionImages;
