const { connectDB, disconnectDB } = require("../config/db");
const Complaint = require("../models/Complaint");
const nodemailer = require("nodemailer");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const { title, category, priority, description } = req.body;
    if (!title || !category || !priority || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await connectDB();
    const complaint = new Complaint({
      title,
      category,
      priority,
      description,
    });
    await complaint.save();
    // Send email on complaint creation
    res.status(201).json({ message: "Complaint created ", complaint });
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
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    // Send email on status update
    // if (req.body.status) {
    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS,
    //     },
    //   });

    //   const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: process.env.ADMIN_EMAIL,
    //     subject: "Complaint Status Updated",
    //     text: `The status of the complaint "${updatedComplaint.title}" has been updated to "${updatedComplaint.status}".`,
    //   };

    //   await transporter.sendMail(mailOptions);
    // }

    res
      .status(200)
      .json({ message: "Successfully Updated Status", updatedComplaint });
  } catch (error) {
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
};
