// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../../database/database";
import axios from "axios";

function routerFactory(request) {
  return {
    get(cb) {
      console.log("calling get");
      if (request.method === "GET") {
        return cb(request);
      }
    },
    async post(cb) {
      if (request.method === "POST") {
        return cb(request);
      }
    },
    put(cb) {
      if (request.method === "PUT") {
        return cb(request);
      }
    },
    delete(cb) {
      if (request.method === "DELETE") {
        return cb(request);
      }
    },
  };
}

export default async function handler(req, res) {
  const router = routerFactory(req);

  router.get(() => res.status(200).json(data));

  router.post(({ body, headers, params }) => {
    const { description, file } = body;
    const newImage = {
      id: data.length + 1,
      description: description,
      file: file,
    };
    console.log(file, "file");
    data.push(newImage);
    return res.status(201).json({ message: "Data received" });
  });

  router.put(() => {
    return res.status(200).json();
  });

  router.delete(() => {
    return res.status(200).json();
  });
}
