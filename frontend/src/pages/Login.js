import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      window.location.href = "/tasks";
    } catch (error) {
      console.error(error);
      alert("Invalid credentials!");
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
