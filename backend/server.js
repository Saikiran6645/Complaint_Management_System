const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB, disconnectDB } = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
