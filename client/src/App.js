import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // 🔃 Fetch tasks on load
  useEffect(() => {
    fetch("https://task-manager-app-lac-chi.vercel.app/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  // ➕ Add new task
  const addTask = () => {
    if (task.trim() !== "") {
      fetch("https://task-manager-app-lac-chi.vercel.app/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task }),
      })
        .then((res) => res.json())
        .then((newTask) => setTasks([...tasks, newTask]))
        .catch((err) => console.error("Failed to add task:", err));
      setTask("");
    }
  };

  // ✅ Toggle Task Completion
  const toggleTask = (id) => {
    fetch(`https://task-manager-app-lac-chi.vercel.app/api/tasks/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updatedTasks) => setTasks(updatedTasks))
      .catch((err) => console.error("Failed to toggle task:", err));
  };

  // ❌ Delete Task
  const deleteTask = (id) => {
    fetch(`https://task-manager-app-lac-chi.vercel.app/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error("Failed to delete task:", err));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(task.id)}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
