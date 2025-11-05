import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Define API URL (Render backend)
const API_URL = import.meta.env.VITE_API_URL || "https://task-manager-backend-atxz.onrender.com";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
      alert("Failed to fetch tasks.");
    }
  };

  // ✅ Create new task
  const createTask = async () => {
    if (!title.trim()) return alert("Please enter a task title!");
    try {
      await axios.post(
        `${API_URL}/api/tasks`,
        { title, description: "New Task", status: "pending" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("❌ Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  // ✅ Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("❌ Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  // ✅ Update a task (mark completed)
  const updateTask = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("❌ Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  // ✅ Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h2>Your Tasks</h2>

      <input
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "6px", borderRadius: "5px", border: "1px solid gray" }}
      />
      <button
        onClick={createTask}
        style={{
          marginLeft: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tasks.length === 0 ? (
          <p>No tasks found. Add some!</p>
        ) : (
          tasks.map((t) => (
            <li key={t._id} style={{ margin: "10px", fontSize: "18px" }}>
              <strong>{t.title}</strong> -{" "}
              <span
                style={{
                  color: t.status === "completed" ? "green" : "orange",
                }}
              >
                {t.status}
              </span>

              <button
                onClick={() => updateTask(t._id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                ✔
              </button>

              <button
                onClick={() => deleteTask(t._id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Tasks;
