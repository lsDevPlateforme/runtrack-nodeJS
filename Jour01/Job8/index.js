import fs from "node:fs/promises";

const fileContent = await fs.readFile("./data.txt", "utf8", (err, data) => {
  if (err) return err;
  return data;
});

let newContent = "";

for (let i = 0; fileContent.length != i; i++) {
  if (i % 2 === 0) {
    newContent += fileContent[i];
  }
}

console.log("Une lettre sur deux du fichier data.txt:");
console.log(newContent);
