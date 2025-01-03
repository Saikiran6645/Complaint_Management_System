import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://complaint-management-system-1.onrender.com/api/user/login",
        loginData
      );
      if (response.status === 201) {
        setLoginData({
          email: "",
          password: "",
        });

        localStorage.setItem("userInfo", JSON.stringify(response.data));

        if (response.data.role === "Admin") {
          navigate("/complaints");
        } else {
          navigate("/");
        }
        setSuccessMessage("Login successful!");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p>
          <Link to={"/register"}>Don't have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
