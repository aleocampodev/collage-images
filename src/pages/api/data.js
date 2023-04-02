// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from "../../database/database.json";

export default function handler(req, res) {
  if (req.method === "POST") {
    return res.status(201).json(data);
  }
  return res.status(200).json(data);
}
