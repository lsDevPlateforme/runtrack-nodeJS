import fs from "node:fs/promises";

const content = "Je manipule les fichiers avec un module node !";

fs.writeFile("./data.txt", content, (err) => {
  if (err) return err;
});
