import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserComplaints.css";
import NavigationBar from "../NavBar/NavigatorBar";

const UserComplaints = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserComplaints = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints/userComplaints",
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserComplaints();
  }, [userInfo.token]);

  return (
    <>
      {userInfo ? <NavigationBar /> : " "}
      <div className="user-complaints-container">
        <h2>Your Complaints</h2>
        {isLoading && <p className="loading-message">Loading...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {complaints.length > 0 ? (
          <table className="user-complaints-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
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
    </>
  );
};

export default UserComplaints;
