import express from "express";
import Users from "../Model/signupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find user by name
    const user = await Users.findOne({ name });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid Password");
    }

    const token = jwt.sign(
      { userId: user._id }, // This is the "payload"
      process.env.JWT_SECRET, // The secret key from .env
      { expiresIn: "1h" } // (Optional) Token expires in 1 hour
    );

    // Successful login
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

export default loginRouter;
