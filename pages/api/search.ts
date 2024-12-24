import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "./constants";
import { processValue } from "./utils";

type ResponseData = {
  images: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { keywards } = req.query;

  // Sanitize and validate the input query
  const processedKeywards = processValue(keywards);
  if (!processedKeywards) {
    res.status(400).json({ images: null });
    console.error("Query is empty or invalid");
    return;
  }

  const url = `${baseURL}/search/photos?page=1&query=${encodeURIComponent(
    processedKeywards
  )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    console.log("Fetching from Unsplash API:", { url });
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Unsplash API error: ${result.statusText}`);
    }

    const data = await result.json();
    res.status(200).send({ images: data });
  } catch (error) {
    console.error("Error fetching Unsplash API:", error);
    res.status(500).json({ images: null });
  }
}
