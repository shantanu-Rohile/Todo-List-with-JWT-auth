import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
     unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Users = mongoose.model("Users", signupSchema);

export default Users;
