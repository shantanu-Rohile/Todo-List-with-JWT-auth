import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    task:{
        type:String,
        required: true,
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required:true
  }
})
const todoModel=mongoose.model("list",todoSchema);


export default todoModel