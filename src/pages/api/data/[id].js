import { data } from "../../../database/database.js";

export default function handler(req, res) {
  const { id } = req.query;
  const dataImage = data.find((dataImage) => dataImage.id === parseInt(id));
  res.status(200).json(dataImage);
}
