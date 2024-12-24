"use client";

import { GenericImage, ThumbTypeRecord } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProfileImage } from "@/app/components/profile-image/ProfileImage";
import { ImageLoadSkalaton } from "@/app/components/loader/ImageLoadSkalaton";
import { AddToCollection } from "@/app/components/add-to-collection/AddToCollection";
import { DummyImageThumbnail } from "@/app/components/loader/DummyImageThumbnail";
import Link from "next/link";

const ImageDetails: React.FC<{ params: Promise<{ id: string }> }> = ({
  params
}) => {
  const [imageDetails, setImageDetails] = useState(
    {} as { images: GenericImage; collectionThumb: ThumbTypeRecord }
  );
  const [isLoading, setLoading] = useState(true);
  const [openAddToCollection, setOpenAddToCollection] = useState(false);
  // Use useSearchParams to get query parameters in App Router

  const { id } = React.use(params);

  const handleCloseModal = () => {
    setOpenAddToCollection(!openAddToCollection);
  };

  const handleRemoveImage = async (collectionId: string) => {
    console.log({ id, collectionId });
    const updateCollection = await fetch(
      `/api/removeFromCollection?collectionId=${collectionId}&imageId=${id}`
    );
    const data = await updateCollection.json();
    console.log(data.images.photo.current_user_collections);
    const updatedCollections =
      imageDetails.images?.current_user_collections.filter(
        (collection) => collection.id !== collectionId
      );

    // Update the state with the new current_user_collections
    setImageDetails((prevDetails) => ({
      ...prevDetails,
      images: {
        ...prevDetails.images,
        current_user_collections: updatedCollections
      }
    }));
    // if (data) {
    //   handleSubmit();
    // }
  };

  useEffect(() => {
    console.log("page ", id);
    if (id) {
      fetch(`/api/getImageDetails?imageId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setImageDetails(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (isLoading)
    return (
      <div className='text-center container mx-auto px-4 pt-10'>
        <ImageLoadSkalaton />
      </div>
    );
  if (!imageDetails) return <p className='text-center'>No Image Found</p>;
  const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };
  return (
    <>
      {openAddToCollection && (
        <AddToCollection imageId={id} closeHandler={handleCloseModal} />
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 pt-10 gap-8'>
        <div
          className={`relative rounded-md bg-[${imageDetails.images.color}]`}
        >
          <Image
            className='rounded-md'
            width={590}
            height={700}
            alt={imageDetails.images.slug}
            src={imageDetails.images.urls.full}
          />
        </div>
        <div className='details text-base'>
          <ProfileImage profileDetails={imageDetails.images.user} />
          <div className='pt-8'>
            Published on {convertDate(imageDetails.images.created_at)}
          </div>
          <div className='pt-8 flex items-top'>
            <button
              onClick={() => setOpenAddToCollection(!openAddToCollection)}
              className='text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-plus-lg'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2'
                />
              </svg>
              Add to Collection
            </button>
            <Link
              href={`${imageDetails.images.links.download}&force=true`}
              className='text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2'
            >
              <span className='pr-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-arrow-down-circle'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z'
                  />
                </svg>
              </span>
              Download
            </Link>
          </div>
          <div className='pt-8'>
            <h3 className='text-2xl mb-3 font-bold'>Collections</h3>
            {imageDetails.images?.current_user_collections.length > 0 && (
              <ul>
                {imageDetails.images?.current_user_collections.map(
                  ({ id, title, total_photos }) => {
                    return (
                      <li
                        key={id}
                        onClick={() => handleRemoveImage(id)}
                        className='p-3 hover:bg-gray-200 flex mb-3 cursor-pointer rounded-md justify-between'
                      >
                        <div className='flex'>
                          <div className='pr-3'>
                            {imageDetails.collectionThumb[id].thumbnail ? (
                              <Image
                                src={imageDetails.collectionThumb[id].thumbnail}
                                width={80}
                                height={80}
                                alt={title}
                                className='rounded-md'
                              ></Image>
                            ) : (
                              <>
                                <DummyImageThumbnail />
                              </>
                            )}
                          </div>
                          <div>
                            <div className='text-lg font-bold'>{title}</div>
                            {total_photos} photos
                          </div>
                        </div>
                        <div className='flex w-20 items-center text-xs'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-dash'
                            viewBox='0 0 16 16'
                          >
                            <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
                          </svg>
                          Remove
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDetails;
