const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const DATA_FILE = "./data.json";

// Read tasks from JSON file
const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Write tasks to JSON file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Get all tasks
app.get("/tasks", (req, res) => {
  const tasks = readData();
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const tasks = readData();
  const newTask = { id: Date.now(), title: req.body.title, completed: false };
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
});

// Update task completion
app.put("/tasks/:id", (req, res) => {
  let tasks = readData();
  tasks = tasks.map((task) =>
    task.id == req.params.id ? { ...task, completed: req.body.completed } : task
  );
  writeData(tasks);
  res.json({ message: "Task updated successfully" });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  let tasks = readData();
  tasks = tasks.filter((task) => task.id != req.params.id);
  writeData(tasks);
  res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
