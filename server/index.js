const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://task-manager-app-frontend-beige.vercel.app",
  "https://task-manager-app1-alpha.vercel.app"
];

// ✅ CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());

// ✅ Preflight handler for Vercel
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

// ✅ Use local variable, not global
let tasks = [
  { id: 1, title: "Sample Task", completed: false }
];

// ✅ Health check
app.get("/api/ping", (req, res) => {
  res.json({ message: "Server is alive!" });
});

// ✅ Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ Create a new task
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ Toggle task completion
app.put("/api/tasks/:id", (req, res) => {
  tasks = tasks.map(task =>
    task.id == req.params.id ? { ...task, completed: !task.completed } : task
  );
  res.json(tasks);
});

// ✅ Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = app;
module.exports.handler = serverless(app);
