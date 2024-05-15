const routes = require("./routes");

const requestListener = function (req, res) {
  routes(req, res);
};

module.exports = requestListener;
