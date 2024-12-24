import { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "./constants";
import { CollectionType, PhotoType, UserType } from "@/types";

type ResponseData = {
  images?: {
    photo: PhotoType;
    collection: CollectionType;
    user: UserType;
    created_at: string;
  };
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { imageId, collectionId } = req.query;

    console.log("Received Params:", { imageId, collectionId });

    if (!imageId || !collectionId) {
      return res.status(400).json({ error: "Missing imageId or collectionId" });
    }

    // Verify if the access token is loaded
    const accessToken = process.env.UNSPLASH_ACCESSTOKEN;
    console.log("Unsplash Access Key:", accessToken);

    if (!accessToken) {
      return res.status(500).json({ error: "Missing Unsplash Access Key" });
    }

    const url = `${baseURL}/collections/${collectionId}/remove`;
    console.log("remove url:", url);

    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}` // Use Bearer token
      },
      body: JSON.stringify({
        photo_id: imageId
      })
    });

    if (!result.ok) {
      const errorData = await result.json();
      console.error("Error from Unsplash API:", errorData);
      return res
        .status(result.status)
        .json({ error: errorData.errors || "API request failed" });
    }

    const data = await result.json();
    res.status(200).json({ images: data });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
