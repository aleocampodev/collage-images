// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../../database/database";
import axios from "axios";

async function routerFactory(request) {
  return {
    get(cb) {
      console.log("calling get");
      if (request.method === "GET") {
        return cb(request);
      }
    },
    async post(cb) {
      if (request.method === "POST") {
        const update = await axios("/api/data", {
          headers: {
            "Content-Type": "application/json",
          },
          body: request.body,
        });
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

  router.get(({ body, headers, params }) => {
    return res.status(200).json(data);
  });

  router.post(({ body, headers, params }) => {
    console.log(body);
    return res.status(201).json({ message: "Data received" });
  });

  router.put(({ body, headers, params }) => {
    return res.status(200).json();
  });

  router.delete(({ body, headers, params }) => {
    return res.status(200).json();
  });
}
