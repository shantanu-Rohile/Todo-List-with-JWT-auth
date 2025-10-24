import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer "
  if (!token) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach user ID to request
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
