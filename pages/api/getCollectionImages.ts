import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "./constants";
import { processValue } from "./utils";
import { GenericImage } from "@/types";

type ResponseData = {
  images: GenericImage[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { collectionId } = req.query;
  // Sanitize and validate the input query
  const processedKeywards = processValue(collectionId);
  if (!processedKeywards) {
    res.status(400).json({ images: [] });
    console.error("Query is empty or invalid");
    return;
  }
  // const images = await fetch()
  const url = `${baseURL}/collections/${encodeURIComponent(
    processedKeywards
  )}/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  const response = await fetch(url);
  const images = await response.json();
  res.status(200).json({ images });
}
