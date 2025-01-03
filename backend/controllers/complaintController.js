const { connectDB, disconnectDB } = require("../config/db");
const Complaint = require("../models/Complaint");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const { title, category, priority, description } = req.body;
    if (!title || !category || !priority || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await connectDB();
    console.log(req.user);
    const user = await User.findById(req.user._id);
    const complaint = new Complaint({
      user: req.user._id,
      title,
      category,
      priority,
      description,
    });

    // Send email on complaint creation
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email details
    const mailOptions = {
      from: user.email, // Sender address
      to: process.env.ADMIN_EMAIL, // Admin email address
      subject: "New Complaint Created",
      html: `
        <h3>New Complaint Submitted</h3>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p>Submitted by user: ${user.email}</p>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error(error.message);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint created ", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectDB();
  }
};
const getUserComplaints = async (req, res) => {
  try {
    await connectDB();
    const id = req.user._id;

    const complaints = await Complaint.find({
      user: id,
    });
    console.log(complaints);
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectDB();
  }
};
// Get All Complaints
const getComplaints = async (req, res) => {
  try {
    await connectDB();
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectDB();
  }
};

// Update Complaint
const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Complaint Id required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }
    await connectDB();
    const user = await User.findById(req.user._id);
    if (user.role !== "Admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    const updated = await Complaint.findById(id);

    if (updated.status === "Pending") {
      return res
        .status(200)
        .json({ message: "Successfully Updated Status", updatedComplaint });
    }
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Complaint Created",
      html: `
        <h3>New Complaint Status Updated to ${updated.status}</h3>
        <p><strong>Title:</strong> ${updated.title}</p>
        <p><strong>Category:</strong> ${updated.category}</p>
        <p><strong>Priority:</strong> ${updated.priority}</p>
        <p><strong>Description:</strong> ${updated.description}</p>
        <p><strong>Status:</strong> ${updated.status}</p>
        <p>Submitted by user: ${user.email}</p>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error(error.message);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res
      .status(200)
      .json({ message: "Successfully Updated Status", updatedComplaint });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Complaint Id required" });
    }
    await connectDB();
    await Complaint.findByIdAndDelete(id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await disconnectDB();
  }
};
module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getUserComplaints,
};
