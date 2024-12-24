"use client";

import { CollectionType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { CollectionGridItems } from "../components/collection-grid/CollectionGridItems";
import { Title } from "../components/title/Title";

const About = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([] as CollectionType[]);

  const getCollections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/getCollection`);
      if (!response.ok) {
        setCollections([]);
        setLoading(false);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const results = data.collections;
      // Filter out collections where the image is already added
      // const filteredResults = filterCollectionsWithImage(results);
      setCollections(results);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getCollections();
  }, []);
  return (
    <div className='container mx-auto px-4'>
      <div className='text-center pt-10'>
        <Title>Collections</Title>
        <div></div>
        <p className='max-w-md inline-block pb-10'>
          Explore the world through collections of beautiful photos free to use
          under the Unsplash License.
        </p>
      </div>
      {loading ? (
        <div className='text-center'>
          <p className='inline-block pb-10'>loading</p>
        </div>
      ) : (
        collections.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
            {collections.map((collection) => {
              return (
                <CollectionGridItems
                  key={collection.id}
                  collectionDetails={collection}
                />
              );
            })}
          </div>
        )
      )}
    </div>
  );
};
export default About;
