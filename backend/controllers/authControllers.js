const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB, disconnectDB } = require("../config/db");
const User = require("../models/User");
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const saltRounds = 5;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    let newUser = new User({
      username,
      email,
      password: encryptedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    await disconnectDB();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide credentials" });
    }
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid login credentials" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid login credentials" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Login successful",
      token,
      role: user.role,
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    await disconnectDB();
  }
};
module.exports = { register, login };
