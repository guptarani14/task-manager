import { useState } from "react";
import axios from "axios";
import "./Auth.css";

// ✅ Define API URL (Render backend)
const API_URL = import.meta.env.VITE_API_URL || "https://task-manager-backend-atxz.onrender.com";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Updated handleSignup function
  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/users/signup`, {
        name,
        email,
        password,
      });
      console.log("✅ Signup Response:", res.data);
      alert("Signup Successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Signup Error:", error);
      alert("Signup Failed! Please check server or inputs.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <input
          className="auth-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="auth-button" onClick={handleSignup}>
          Signup
        </button>
        <p className="auth-text">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
