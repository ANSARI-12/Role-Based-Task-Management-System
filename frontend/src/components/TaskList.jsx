import { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask } from "../services/api";

export default function TaskList({ refresh, user }) {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  useEffect(() => {
    loadTasks();
  }, [refresh]);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditForm({ title: task.title, description: task.description });
  };

  const handleSave = async () => {
    await updateTask(editingId, editForm);
    setEditingId(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

  return (
    <div>
      <h3>All Tasks</h3>

      {tasks.map((t) => (
        <div
          key={t._id}
          style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
        >
          {editingId === t._id ? (
            <>
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Title"
              />
              <input
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Description"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <b>{t.title}</b>
              <p>{t.description}</p>
              {user && user.role === "admin" && (
                <p>User: {t.user ? t.user.name : "Unknown"}</p>
              )}
              <button onClick={() => handleEdit(t)}>Edit</button>
              <button onClick={() => handleDelete(t._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
