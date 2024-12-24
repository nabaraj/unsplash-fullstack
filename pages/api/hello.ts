import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log({ req });
  // const images = await fetch()
  res.status(200).json({ message: "Hello from Next.js!" });
}
