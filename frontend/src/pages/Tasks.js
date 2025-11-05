import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    fetchTasks();
    
  }, []);

 
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
    }
  };

  const createTask = async () => {
    if (!title.trim()) return alert("Please enter a task title!");
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description: "New Task", status: "pending" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("❌ Error creating task:", err);
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("❌ Error deleting task:", err);
    }
  };


  const updateTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* Logout button */}
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

      {/* Title */}
      <h2>Your Tasks</h2>

      {/* Input for adding new task */}
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

      {/* Task List */}
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

              {/* Update button */}
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

              {/* Delete button */}
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
