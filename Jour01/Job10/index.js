import url from "node:url";

const urlValue = "https://www.google.com/search?q=nodejs";

const q = url.parse(urlValue, true);

const protocol = q.protocol;
const host = q.host;
const param = `${q.pathname}/?lang=fr`;

const newUrl = `${protocol}//www.laplateforme.io${param}`;

console.log(newUrl);
