import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "./constants";
import {
  CurrentUserCollection,
  ThumbTypeRecord
} from "@/types/collection-type";

type ResponseData = {
  images: Record<string, string>;
  collectionThumb: ThumbTypeRecord;
};

const fetchCollectionThumbnails = async (
  collections: CurrentUserCollection[]
): Promise<ThumbTypeRecord> => {
  const thumbnails = await Promise.all(
    collections.map(async (collection) => {
      const response = await fetch(
        `${collection.links.photos}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
      );
      const photos = await response.json();
      console.log("fetchCollectionThumbnails ", { photos });
      return {
        id: collection.id,
        title: collection.title,
        thumbnail: photos.length ? photos[0].urls.thumb : null
      };
    })
  );
  const thumbCollectionMap: ThumbTypeRecord = {};
  thumbnails.forEach((thumb) => {
    thumbCollectionMap[thumb.id] = thumb;
  });
  return thumbCollectionMap;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { imageId } = req.query;
  const url = `${baseURL}/photos/${imageId}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  console.log("**** ", { url });
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.UNSPLASH_ACCESSTOKEN}` // Use Bearer token
    }
  });
  const data = await result.json();
  const collectionsThumbnails = await fetchCollectionThumbnails(
    data.current_user_collections
  );
  console.log({ collectionsThumbnails });

  res
    .status(200)
    .send({ images: data, collectionThumb: collectionsThumbnails });
}
