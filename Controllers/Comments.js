import Comments from '../Models/Comments.js'
import Blogs from '../Models/Blogs.js'
import user from '../Models/User.js';
import mongoose, { mongo } from "mongoose";

export const getComments=async(req,res)=>{
    try{

        const{id}=req.params;
        const data=await Comments.find({postId:mongoose.Types.ObjectId(id)}).sort({ createdDate: -1 }).limit(20).populate('userId');

        res.send({Error:'NA',Data:data});
    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'getComments', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        res.send({Error:String(err),Status:"Error"})

    }
}

export const addComment=async(req,res)=>{
    try{
        const {postId,userId,description}=req.body;
        const newComment=new Comments({
            createdDate:Date.now(),
            description:description,
            postId:mongoose.Types.ObjectId(postId),
            userId:mongoose.Types.ObjectId(userId)
        })
        await newComment.save();

        const data=await Comments.find({_id:mongoose.Types.ObjectId(newComment._id)}).populate('userId').lean().exec();

        res.send({Error:'NA',Data:data});

    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'addComment', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        res.send({Error:String(err),Status:"Error"})

    }
}