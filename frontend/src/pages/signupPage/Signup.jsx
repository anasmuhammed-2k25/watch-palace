import { useState } from "react";
import axios from "axios";
import "./signupPage.css";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";
const API = import.meta.env.VITE_API_URL;


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (name.length === 0) {
      newErrors.name = "Username is required";
    } else if (name.length < 4) {
      newErrors.name = "Username must be at least 4 characters";
    }

    if (email.length === 0) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
   
    if (password.length === 0) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await axios.post(`${API}/signup`, {
        name,
        email,
        password,
      });

      if (res.data.status) {
        alert("Signup Successful");
         navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Something went wrong");
    }
  };

  return (
    <div className="signup-page">
      <div className="auth-nav">
        <Nav />
      </div>

      <form className="signup-form fade-up" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <div className="signup-input-group" style={{ width: '100%' }}>
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="signup-input-group" style={{ width: '100%' }}>
          <input
            className="signup-input"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="signup-input-group" style={{ width: '100%' }}>
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button className="signup-btn" type="submit">
          Signup
        </button>

        <p style={{ marginTop: "20px", color: "var(--color-muted)", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--color-gold)", textDecoration: "none", marginLeft: "5px" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;