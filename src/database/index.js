const fs = require("fs");
const words = ["lazy", 1, "beautiful"];
fs.writeFile("soylinda.js", JSON.stringify(words), (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("casi que si");
});
