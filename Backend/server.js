import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import todoRouter from "./Route/todoRoutes.js";
import signupRouter from "./Route/signupRoutes.js";
import loginRouter from "./Route/loginRoutes.js";
import cors from "cors"
import { authMiddleware } from "./Middleware/authMiddleware.js";



dotenv.config()
const app=express();
app.use(cors());

const PORT=process.env.PORT
const mongodbURL=process.env.mongodbURL


app.use(express.json())

app.use("/signup",signupRouter)
app.use("/login",loginRouter)
app.use("/list",todoRouter)
app.get("/verify", authMiddleware, (req, res) => {
  res.status(200).send("Valid token");
});

mongoose
.connect(mongodbURL)
.then(()=>{
    console.log("Databse Connected")
    app.listen(PORT,() => {
      console.log(`Connection established on port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error)
})