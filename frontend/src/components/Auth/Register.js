import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint for user registration
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );
      if (response.status === 201) {
        alert("Registration successful");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
            />
            Admin
          </label>
        </div>
        <button type="submit">Register</button>
        <p>
          <Link to={"/login"}>already have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
