import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint for user registration
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        loginData
      );
      if (response.status === 201) {
        setLoginData({
          email: "",
          password: "",
        });

        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setIsSuccess(true);
        if (response.data.role === "admin") {
          navigate("/complaints");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setIsError(error.response.data.message);
    }
  };

  return (
    <div>
      {isSuccess && <p>Login successful</p>}

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <p>
          <Link to={"/register"}>Don't have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
