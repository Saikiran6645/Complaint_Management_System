import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserComplaints.css";

const UserComplaints = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints/",
          {
            // You may need to include a user identifier (e.g., user ID or token) in the request
            headers: {
              authorization: `Bearer ${userInfo.token}  )}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching user complaints", error);
        alert(error.response.data.message);
      }
    };

    fetchUserComplaints();
  }, []);

  return (
    <div className="user-complaints-container">
      <h2>Your Complaints</h2>
      {complaints.length > 0 ? (
        <table className="user-complaints-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>description</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.category}</td>
                <td>{complaint.priority}</td>
                <td>{complaint.status}</td>
                <td>
                  {new Date(complaint.dateSubmitted).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No complaints found.</p>
      )}
    </div>
  );
};

export default UserComplaints;
