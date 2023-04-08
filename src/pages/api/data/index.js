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
    post(cb) {
      if (request.method === "POST") {
        return cb(request);
      }
    },
    put(cb) {
      if (request.method === "PUT") {
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
    return res.status(200).json(body);
  });
}
