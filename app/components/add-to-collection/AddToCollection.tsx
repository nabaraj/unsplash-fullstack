import React, { useCallback, useEffect, useState } from "react";
import { CollectionListItem } from "../collection-list/CollectionListItem";
import { CollectionResultType } from "@/types/api-response";
import { ListLoadSkalaton } from "../loader/ListLoadSkalaton";
interface AddToCollectionProps {
  // Add your props here
  imageId: string;
  closeHandler: () => void;
}

export const AddToCollection: React.FC<AddToCollectionProps> = ({
  imageId,
  closeHandler
}) => {
  // Add your component logic here
  const [collections, setCollections] = useState([] as CollectionResultType[]);
  const [filteredCollection, setFilteredCollection] = useState(
    [] as CollectionResultType[]
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const filterCollectionsWithImage = useCallback(
    (collections: CollectionResultType[]) => {
      return collections.filter((collection) => !collection.haveCurrentImage);
    },
    []
  );

  const getCollections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/search-collection?imageId=${imageId}`);
      if (!response.ok) {
        setCollections([]);
        setLoading(false);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const results = data.collections;
      // Filter out collections where the image is already added
      const filteredResults = filterCollectionsWithImage(results);
      setCollections(filteredResults);
      setFilteredCollection(filteredResults); // Initialize filteredCollection
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [filterCollectionsWithImage]);

  const filterCollection = useCallback(
    (search: string) => {
      setSearch(search);
      const filterCollections = collections.filter(
        (collection) =>
          collection.title.toLowerCase().includes(search.toLowerCase()) &&
          !collection.haveCurrentImage
      );
      setFilteredCollection(filterCollections);
    },
    [collections]
  );

  const handleAddtoCollection = async (
    imageId: string,
    collectionId: string
  ) => {
    console.log({ imageId, collectionId });
    const updateCollection = await fetch(
      `/api/addToCollection?collectionId=${collectionId}&imageId=${imageId}`
    );
    const data = await updateCollection.json();
    if (data) {
      getCollections(); // Refresh the collection list after adding
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    getCollections();
    return () => document.body.classList.remove("overflow-hidden");
  }, [getCollections]);

  // useEffect(() => {
  //   filterCollection(collections);
  // }, [filterCollection, collections]);

  return (
    <>
      <div
        id='authentication-modal'
        tabIndex={-1}
        aria-hidden='false'
        className='fixed inset-0 flex items-center justify-center z-30'
      >
        <div className='bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col relative z-20'>
          <div className='h-[69px] flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Add to Collection
            </h3>
            <button
              type='button'
              className='!hidden end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='authentication-modal'
              onClick={closeHandler}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-4 border-b border-gray-200'>
            <div className='max-w-xl mx-auto'>
              <div className='relative'>
                <input
                  type='text'
                  id='default-search'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='Enter your keywards...'
                  required
                  onChange={(e) => filterCollection(e.target.value)}
                  value={search}
                />
              </div>
            </div>
          </div>
          <div className='p-4'>{filteredCollection.length} matches</div>

          <div className='flex-1 overflow-y-auto p-4'>
            {loading ? (
              <>
                <ListLoadSkalaton />
                <ListLoadSkalaton />
              </>
            ) : (
              filteredCollection.map(
                ({
                  id,
                  title,
                  cover_photo: {
                    urls: { small }
                  },
                  total_photos
                }) => (
                  <CollectionListItem
                    key={id}
                    title={title}
                    url={small}
                    total={total_photos}
                    className='group'
                    verticle='center'
                    onClickHandler={() => handleAddtoCollection(imageId, id)}
                  >
                    <div className='pl-1 whitespace-nowrap text-sm hidden group-hover:block'>
                      + Add To Collection
                    </div>
                  </CollectionListItem>
                )
              )
            )}
          </div>
        </div>
        <div
          className='absolute bg-gray-800 bg-opacity-50 w-full top-0 left-0 h-full z-10'
          onClick={closeHandler}
        ></div>
      </div>
    </>
  );
};
