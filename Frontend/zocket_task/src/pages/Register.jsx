import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://zocket-hzqo.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}

export default Register;
