const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://task-manager-app-frontend-beige.vercel.app",
  "https://task-manager-app1-alpha.vercel.app"
];

// ✅ Safe CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false);
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());

// ✅ Handle preflight requests
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

// ✅ Declare global-safe task array
global.tasks = global.tasks || [
  { id: 1, title: "Sample Task", completed: false }
];

// ✅ Routes
app.get("/api/tasks", (req, res) => {
  try {
    res.json(global.tasks);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ message: "GET failed" });
  }
});

app.post("/api/tasks", (req, res) => {
  try {
    const newTask = {
      id: Date.now(),
      title: req.body.title,
      completed: false
    };
    global.tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ message: "POST failed" });
  }
});

app.put("/api/tasks/:id", (req, res) => {
  try {
    global.tasks = global.tasks.map(task =>
      task.id == req.params.id ? { ...task, completed: !task.completed } : task
    );
    res.json(global.tasks);
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ message: "PUT failed" });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  try {
    global.tasks = global.tasks.filter(task => task.id != req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ message: "DELETE failed" });
  }
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "Server is alive!" });
});

module.exports = app;
module.exports.handler = serverless(app);
