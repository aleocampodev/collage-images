const fs = require("fs");
const words = ["lazy", 1, "beautiful"];
fs.writeFile(
  "soylinda.js",
  'const words = ["lazy", 1, "beautiful"];',
  (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("casi que si");
  }
);

//JSON.stringify(words)
