import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return <Outlet />;
};

export default AuthComponent;
