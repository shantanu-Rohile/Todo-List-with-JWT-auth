import express from "express"
import Users from "../Model/signupModel.js";
import bcrypt from "bcrypt"
const signupRouter=express.Router();

signupRouter.get('/',async(req,res)=>{
    const result=await Users.find({});
    res.status(201).send(result);
})

signupRouter.post('/',async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const salt=await bcrypt.genSalt(10);
        const hsahpassword=await bcrypt.hash(password,salt);
        const newTask=await Users.create({name,email,password:hsahpassword});
        res.status(201).send("Data has been loaded scuccessfully")
    } catch (error) {
            res.status(404).send("Data has been not loaded scuccessfully")
            console.log(error);
    }
})


export default signupRouter;
// todoRouter.delete