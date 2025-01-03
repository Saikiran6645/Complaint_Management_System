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
    role: "User", // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );
      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "User",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Navigate after 2 seconds to show the success message
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
              value="User"
              checked={formData.role === "User"}
              onChange={handleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Admin"
              onChange={handleChange}
            />
            Admin
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p>
          <Link to={"/login"}>Already have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
