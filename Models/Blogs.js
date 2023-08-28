import mongoose from "mongoose";
const Schema=mongoose.Schema
const blogsSchema=new Schema({
    userId:{
    type: Schema.Types.ObjectId, ref: 'authUser'
    },
    title:{
        type:String,
    },
    body:{
        type:String,
    },
    files:{
        type:String,
    },
    ref1:{
        type:String,
    },
    ref2:{
        type:String,
    },
    createdDate:{
        type:Date,
    },
    modifiedDate:{
        type:Date,
    },
    isActive:{
        type:Boolean
    }
});
const blogs=mongoose.model("blogs",blogsSchema);
export default blogs;
