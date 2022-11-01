import { request } from "https";
// import server from "../../../config/index"
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { url } from "inspector";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

const urlstring = "http://localhost:7257";
const requestType = "/api/account";

export const fetchAccount = async () => {
  console.log("Fetching Accounts");
  const response = await axios.get(urlstring + requestType);
  const account = response.data;

  console.log("Account:", account);
  return account;
};

// const { query: {
//     id,
//     name,
//     description,
//     content,
//     images,
// }, method,
// } =req

// switch( method) {
//     case 'GET':
//         const { data } = await axios.get(`${server}/api/account${content.params.id}` )
//         res.status(200).json({})
//     break;
//     case 'POST':
//         const { data } = await axios.post()
//         request.stat
//         break;
// }
