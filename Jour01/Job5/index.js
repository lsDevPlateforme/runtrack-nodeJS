import path from "node:path";

const file = "./index.js";

const nameFile = path.basename(file);
const pathFile = path.dirname(file);
const extFile = path.extname(file);

console.log(`Nom du fichier: ${nameFile}`);
console.log(`Extention du fichier: ${extFile}`);
console.log(`Répertoire parent du fichier: ${pathFile}`);
