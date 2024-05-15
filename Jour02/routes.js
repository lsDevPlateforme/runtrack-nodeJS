const url = require("url");
const fs = require("fs");

const dataFile = "data.json";

const readData = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

const routes = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const reqUrl = url.parse(req.url, true);
  const pathname = reqUrl.pathname;

  if (req.method === "GET") {
    if (pathname === "/") {
      res.end("My API");
    } else if (pathname === "/tasks") {
      const tasks = readData();
      res.write(JSON.stringify(tasks));
      res.end();
    }
  } else if (req.method === "POST") {
    if (pathname === "/tasks") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const newTask = JSON.parse(body);
        newTask.id = JSON.stringify(tasks).length + 1;
        const tasks = readData();
        tasks.push(newTask);
        writeData(tasks);
        res.write(JSON.stringify(newTask));
        res.end();
      });
    }
  } else if (req.method === "PUT") {
    const id = pathname.split("/")[2];
    if (id) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const updatedTask = JSON.parse(body);
        const tasks = readData();
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
          writeData(tasks);
          res.write(JSON.stringify(tasks[taskIndex]));
          res.end();
        } else {
          res.statusCode = 404;
          res.write(JSON.stringify({ message: "Task not found" }));
          res.end();
        }
      });
    }
  } else if (req.method === "DELETE") {
    const id = pathname.split("/")[2];
    if (id) {
      const tasks = readData();
      const newTasks = tasks.filter((task) => task.id !== id);
      if (tasks.length !== newTasks.length) {
        writeData(newTasks);
        res.write(JSON.stringify({ message: "Task deleted" }));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "Task not found" }));
        res.end();
      }
    }
  }
};

module.exports = routes;
