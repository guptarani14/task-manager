import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/signup`,
        { name, email, password }
      );
      console.log(res.data);
      alert("Signup Successful!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Signup Failed!");
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
