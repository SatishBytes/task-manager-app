const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://task-manager-app-frontend-beige.vercel.app",
  "https://task-manager-app1-alpha.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false); // ✅ safe fallback
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());

app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

// Routes
let tasks = [
  { id: 1, title: "Sample Task", completed: false }
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  tasks = tasks.map(task =>
    task.id == req.params.id ? { ...task, completed: !task.completed } : task
  );
  res.json(tasks);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = app;
module.exports.handler = serverless(app);
