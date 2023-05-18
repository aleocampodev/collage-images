// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "../../../utils/mongodb";
import { formidable } from "formidable";
const fs = require("fs");
const path = require("path");

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

export default async function handler(req, res) {
  const router = routerFactory(req);

  router.get(() => res.status(200).json(data));

  router.post(async () => {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files, "fields");
      console.log(files.files, files.files.filepath, "path");
      console.log(
        typeof files.files,
        typeof fields.descriptions,
        Object.keys(files.files).length
      );
      if (typeof fields.descriptions === "string") {
        console.log("probando object");
        let descriptions = fields.descriptions;
        let oldPath = files.files?.filepath;
        let newPath = `./public/images/${files.files.originalFilename}`;
        fs.rename(oldPath, newPath, function (err) {});
        const newData = {
          id: data.length + 1,

          description: descriptions,
          src: `/images/${files.files.originalFilename}`,
        };
        data.push(newData);
        /*const dataNew = fs.writeFile(
            "database.js",
            JSON.stringify(arr),
            function (err) {}
          );
  
          //const arr = JSON.stringify(dataNew);
           arr.push(newData);*/
      } else {
        /* const uploadedFiles = files.files.map((file, i) => {
          const oldPath = file.path;
          //const newPath = path.join(process.cwd(), "public", "images", file.name);
          fs.renameSync(oldPath, newPath);
          return {
            id: data.length + 1,

            //description: descriptions[i],
            url: `/images/${files.files.originalFilename}`,
          };
        })*/
        files.files.forEach((item) => {
          console.log(item, "i");
          let oldPath = item.filepath;
          let newPath = `./public/images/${item.originalFilename}`;
          fs.rename(oldPath, newPath, function (err) {});
          const newData = {
            id: data.length + 1,

            //description: descriptions,
            src: `/images/${item.originalFilename}`,
          };
          fields.descriptions.forEach((description) =>
            console.log(description)
          );
          data.push(newData);
        });
      }

      res.status(201).json({ files, fields });
    });

    /*fs.writeFile("database.js", "[...database, ...uploadFiles]", (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("casi que si");
    });*/
  });

  /*router.put(async() => {
    const form = new formidable.IncomingForm({ multiples: true }); 
    return res.status(200).json();
  });*/

  router.delete(() => {
    return res.status(200).json();
  });
}
