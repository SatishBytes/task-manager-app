const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Sample Task", completed: false }
];

// ✅ GET /tasks - Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ POST /tasks - Add a new task
app.post("/tasks", (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ PUT /tasks/:id - Toggle Task Completed
app.put("/tasks/:id", (req, res) => {
  tasks = tasks.map(task =>
    task.id == req.params.id ? { ...task, completed: !task.completed } : task
  );
  res.json(tasks);
});

// ✅ DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.json({ message: "Task deleted" });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Task Manager API is running at http://localhost:${PORT}`);
});
