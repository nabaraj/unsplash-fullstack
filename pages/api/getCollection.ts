import { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "./constants";
import { CollectionType, CurrentUserCollection } from "@/types";
import { getUserDetails } from "./utils";

type ResponseData = {
  collections: CollectionType[] | null;
};

const isCurrentImageAdded = async (
  imageId: string,
  collection: CurrentUserCollection
): Promise<CurrentUserCollection> => {
  console.log({ collection, imageId });
  collection.haveCurrentImage = false;

  try {
    const response = await fetch(
      `${collection.links.photos}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photos = await response.json();

    // Check if the image exists in the collection
    photos.forEach(({ id }: { id: string }) => {
      if (id === imageId) {
        collection.haveCurrentImage = true;
      }
    });
  } catch (error) {
    console.error(
      `Error fetching photos for collection ${collection.id}:`,
      error
    );
  }

  return collection;
};

export function processValue(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value.trim(); // Sanitize input by trimming whitespace.
  } else if (Array.isArray(value)) {
    return value.map((v) => v.trim()).join(","); // Join arrays with commas.
  }
  return ""; // Return an empty string for undefined or invalid input.
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Fetch profile details to get the username

    const { username } = await getUserDetails();

    // Use the username to fetch collections
    const url = `${baseURL}/users/${username}/collections?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const collectionsResponse = await fetch(url);

    if (!collectionsResponse.ok) {
      throw new Error(`Unsplash API error: ${collectionsResponse.statusText}`);
    }

    const collections = await collectionsResponse.json();

    // Process collections to check if the image is in each collection

    res.status(200).send({ collections });
  } catch (error) {
    console.error("Error fetching Unsplash API:", error);
    res.status(500).json({ collections: null });
  }
}
