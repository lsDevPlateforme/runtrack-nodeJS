import fs from "node:fs";

const fileContent = fs.readFileSync("./data.txt", "utf8", (err, data) => {
  if (err) return err;
  return data;
});

console.log(fileContent);
