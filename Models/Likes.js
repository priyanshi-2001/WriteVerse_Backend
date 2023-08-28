import mongoose from "mongoose";
const Schema=mongoose.Schema;
const likesSchema=new Schema({
postId:{
    type:mongoose.Types.ObjectId,
    ref:"posts"
},
reactionType:{
    type:String 
},
userId:{
    type:mongoose.Types.ObjectId,
    ref:"authUser"
},
time:{
    type:Date
}
})
const likes= mongoose.model("likes",likesSchema);

export default likes;

