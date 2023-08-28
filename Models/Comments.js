import mongoose from "mongoose";
const Schema=mongoose.Schema;
const commentsSchema=new Schema({
postId:{
    type:mongoose.Types.ObjectId,
    ref:'posts'
},
userId:{
    type:mongoose.Types.ObjectId,
    ref:"authUser"
},
path:{
    type:String,
},
description:{
    type:String,
},
ref2:{
    type:String,
},
ref3:{
    type:String
},
createdDate:{
    type:Date
}
});
const comments=mongoose.model("comments",commentsSchema);
export default comments