import mongoose from "mongoose";

const Schema=mongoose.Schema
const userSchema=new Schema({
Name:{
    type:String,
    required:true,
},
email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})
const user= mongoose.model("authUser",userSchema);
export default user;

