// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "@/database/database";
import { dbConnect } from "@/uitils/mongoose";
import Collage from "@/models/database";
import { formidable } from "formidable";
var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

dbConnect();

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

export default async function handler(req, res) {
  //const router = routerFactory(req);
  const collages = await Collage.find();
  console.log(collages, "collages");
  res.status(200).json(data);
  //router.get(() => res.status(200).json(data));

  /* router.post(async () => {
    const form = new formidable.IncomingForm({ multiples: true });*/

  /* form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files, "fields");
      /* console.log(files.files.filepath, "path");
      var oldPath = files.files.filepath;
      var newPath = `./public/images/${files.files.originalFilename}`;
      mv(oldPath, newPath, function (err) {});*/
  /* res.status(200).json({ fields, files });
    });

    /*const uploadedFiles = Object.values(files).map((file, i) => {
      const oldPath = file.path;
      const newPath = path.join(process.cwd(), "public", "images", file.name);
      fs.renameSync(oldPath, newPath);
      return {
        name: file.name,
        description: descriptions[i],
        url: `/images/${file.name}`,
      };
    });
    res.status(201).json(uploadedFiles);*/
  //});

  /*router.put(() => {
    return res.status(200).json();
  });

  router.delete(() => {
    return res.status(200).json();
  });*/
}
