import React, { useState } from "react";
import axios from "axios";
import "./ComplaintsForm.css";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/complaints/",
        formData,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response.status === 201) {
        setFormData({
          title: "",
          description: "",
          category: "Product",
          priority: "Low",
        });
        navigate("/userComplaints");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Raise Your Complaint</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <select name="category" onChange={handleChange}>
        <option value="Product">Product</option>
        <option value="Service">Service</option>
        <option value="Support">Support</option>
      </select>
      <div>
        <label>
          <input
            type="radio"
            name="priority"
            value="Low"
            onChange={handleChange}
            defaultChecked
          />{" "}
          Low
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="Medium"
            onChange={handleChange}
          />{" "}
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="High"
            onChange={handleChange}
          />{" "}
          High
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
