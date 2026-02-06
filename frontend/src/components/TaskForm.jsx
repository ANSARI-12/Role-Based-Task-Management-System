import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ onTaskCreated }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask(task);

    alert("Task Created");

    setTask({
      title: "",
      description: "",
    });

    if (onTaskCreated) onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Task</h3>

      <input
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />

      <button>Create</button>
    </form>
  );
}
