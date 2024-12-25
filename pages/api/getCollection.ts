import { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "./constants";
import { CollectionType } from "@/types";
import { getUserDetails } from "./utils";

type ResponseData = {
  collections: CollectionType[] | null;
  error?: string;
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
    // Validate API key
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      throw new Error(
        "Unsplash Access Key is missing from environment variables."
      );
    }

    // Fetch profile details to get the username
    const { username } = await getUserDetails();

    if (!username) {
      throw new Error("Username not found in user details.");
    }

    // Use the username to fetch collections
    const url = `${baseURL}/users/${username}/collections?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const collectionsResponse = await fetch(url);

    if (!collectionsResponse.ok) {
      throw new Error(`Unsplash API error: ${collectionsResponse.statusText}`);
    }

    const collections = await collectionsResponse.json();

    if (!Array.isArray(collections)) {
      throw new Error("Unexpected response format from Unsplash API.");
    }

    // Disable caching in the response
    res.setHeader("Cache-Control", "no-store");

    // Return the collections
    res.status(200).json({ collections });
  } catch (error) {
    console.error("Error fetching Unsplash API:", error);
    res.status(500).json({
      collections: null,
      error: (error as Error).message || "Internal Server Error"
    });
  }
}
