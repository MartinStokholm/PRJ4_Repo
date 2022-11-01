import type { NextApiRequest, NextApiResponse } from "next";
import type { Exercise } from "../../../interfaces/Exercises";
import useSwr from "swr";
import { useRouter } from "next/router";

export default function exerciseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, category },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, category: `User ${id}` });
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ id, category: category || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
