const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secret";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ message: "Access denied only Admin can access " });
  next();
};
const isUser = (req, res, next) => {
  if (req.user.role !== "user")
    return res
      .status(403)
      .json({ message: "Access denied only User can access " });
  next();
};

module.exports = { verifyToken, isAdmin, isUser };
