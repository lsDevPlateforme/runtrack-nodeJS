import fs from "node:fs/promises";

const fileContent = await fs.readFile("./data.txt", "utf8", (err, data) => {
  if (err) return err;
  return data;
});

console.log(fileContent);
