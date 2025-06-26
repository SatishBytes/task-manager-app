import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
   fetch("https://task-manager-app-lac-chi.vercel.app/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);


  const addTask = () => {
    if (task.trim() !== "") {
      fetch("https://task-manager-app-lac-chi.vercel.app/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task }),
      })
        .then((res) => res.json())
        .then((newTask) => setTasks([...tasks, newTask]));
      setTask("");
    }
  };

  // ✅ Toggle Task Completion
  const toggleTask = (id) => {
    fetch(`https://task-manager-app-lac-chi.vercel.app/api/tasks/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updatedTasks) => setTasks(updatedTasks));
  };

  const deleteTask = (id) => {
    fetch(`https://task-manager-app-lac-chi.vercel.app/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)));
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
