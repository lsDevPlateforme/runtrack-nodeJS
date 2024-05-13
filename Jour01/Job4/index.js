import { readdir } from "node:fs/promises";

const files = await readdir("../");

console.log("Contenu du répertoire courant:");
for (const file of files) {
  console.log(file);
}
