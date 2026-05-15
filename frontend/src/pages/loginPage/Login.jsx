import { useState } from "react";
import axios from "axios";
import "./loginPage.css";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";
const API = import.meta.env.VITE_API_URL;


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (email.length === 0) {
      newErrors.email = "Email is required";
    } else if (email.length < 4) {
      newErrors.email = "Email must be at least 4 characters";
    }

    if (password.length === 0) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(`${API}/login`, {
          email,
          password,
        });

        if (res.data.status) {
          alert("Login Successful");
          navigate("/");
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="auth-nav">
        <Nav />
      </div>

      <form className="login-form fade-up" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>

        <div className="login-input-group">
          <input
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{ color: "#ff6b6b", fontSize: "0.8rem", marginTop: "5px" }}>{errors.email}</span>}
        </div>

        <div className="login-input-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span style={{ color: "#ff6b6b", fontSize: "0.8rem", marginTop: "5px" }}>{errors.password}</span>}
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

        <p style={{ marginTop: "20px", color: "var(--color-muted)", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--color-gold)", textDecoration: "none", marginLeft: "5px" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;