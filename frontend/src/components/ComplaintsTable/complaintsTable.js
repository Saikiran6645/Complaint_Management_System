import React, { useEffect, useState } from "react";
import axios from "axios";
import "./complaintsTable.css";

const ComplaintTable = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [editComplaint, setEditComplaint] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  // Filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await axios.get("http://localhost:5000/api/complaints/");
      setComplaints(response.data);
      setFilteredComplaints(response.data); // Initialize filtered complaints
    };
    fetchComplaints();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = complaints;

      // Filter by category
      if (filterCategory) {
        filtered = filtered.filter(
          (complaint) => complaint.category === filterCategory
        );
      }

      // Filter by status
      if (filterStatus) {
        filtered = filtered.filter(
          (complaint) => complaint.status === filterStatus
        );
      }

      // Filter by priority
      if (filterPriority) {
        filtered = filtered.filter(
          (complaint) => complaint.priority === filterPriority
        );
      }

      // Filter by date range
      if (filterStartDate || filterEndDate) {
        filtered = filtered.filter((complaint) => {
          const date = new Date(complaint.dateSubmitted);
          const startDate = filterStartDate ? new Date(filterStartDate) : null;
          const endDate = filterEndDate ? new Date(filterEndDate) : null;
          return (
            (!startDate || date >= startDate) && (!endDate || date <= endDate)
          );
        });
      }

      setFilteredComplaints(filtered);
    };

    applyFilters();
  }, [
    filterCategory,
    filterStatus,
    filterPriority,
    filterStartDate,
    filterEndDate,
    complaints,
  ]);

  const handleEditClick = (complaint) => {
    setEditComplaint(complaint);
    setEditStatus(complaint.status);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${editComplaint._id}`,
        {
          status: editStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setEditComplaint(null);
      const response = await axios.get("http://localhost:5000/api/complaints/");
      setComplaints(response.data);
    } catch (error) {
      alert("Error updating complaint status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const closeModal = () => {
    setEditComplaint(null);
  };

  return (
    <>
      <div className="filters">
        <label>
          Category:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Support">Support</option>
          </select>
        </label>
        <label>
          Status:
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>
        <label>
          Priority:
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </label>
      </div>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.title}</td>
              <td>{complaint.description}</td>
              <td>{complaint.category}</td>
              <td>{complaint.priority}</td>
              <td>{complaint.status}</td>
              <td>
                {new Date(complaint.dateSubmitted).toLocaleDateString("en-GB")}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(complaint)}
                >
                  Edit Status
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(complaint._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editComplaint && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Edit Complaint Status</h3>
            <p>
              <strong>Title:</strong> {editComplaint.title}
            </p>
            <p>
              <strong>Category:</strong> {editComplaint.category}
            </p>
            <p>
              <strong>Priority:</strong> {editComplaint.priority}
            </p>
            <form onSubmit={handleEditSubmit}>
              <label>
                Status:
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </label>
              <button type="submit" className="submit-button">
                Update Status
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintTable;
