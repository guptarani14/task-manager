import { useState } from "react";
import axios from "axios";
import "./Auth.css";

// ✅ Backend URL
const API_URL = process.env.REACT_APP_API_URL || "https://task-manager-sn76.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      window.location.href = "/tasks";
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("Invalid credentials or server issue!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>
        <p className="auth-text">
          Don’t have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
