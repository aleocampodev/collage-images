// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../../database/database";
import axios from "axios";

export const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await axios.post("http://localhost:3000/api/data", {
        headers: {
          "Content-Type": "application/json",
        },
        body: req.body,
      });
      return res.status(201).json(data);
    } catch (error) {
      console.log(error, "error post");
    }
  }
  return res.status(200).json(data);
};
