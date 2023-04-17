// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../../database/database";

import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

function routerFactory(request) {
  return {
    get(cb) {
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
const upload = multer({ dest: "public/images" });

export default async function handler(req, res) {
  const router = routerFactory(req);

  router.get(() => res.status(200).json(data));

  router.post(async () => {
    console.log(req, "ji");
    res.status(201).json({ message: "received" });
  });

  router.put(() => {
    return res.status(200).json();
  });

  router.delete(() => {
    return res.status(200).json();
  });
}
