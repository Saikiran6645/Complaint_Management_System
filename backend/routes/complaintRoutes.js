const express = require("express");
const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getUserComplaints,
} = require("../controllers/complaintController");
const { verifyToken, isUser, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyToken, isUser, createComplaint);
router.get("/", verifyToken, getComplaints);
router.get("/userComplaints", verifyToken, isUser, getUserComplaints);
router.put("/:id", verifyToken, isAdmin, updateComplaint);
router.delete("/:id", verifyToken, isAdmin, deleteComplaint);

module.exports = router;
