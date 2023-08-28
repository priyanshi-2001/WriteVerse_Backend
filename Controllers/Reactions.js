import Comments from '../Models/Comments.js'
import Blogs from '../Models/Blogs.js'
import user from '../Models/User.js';
import likes from '../Models/Likes.js';
import mongoose, { mongo } from "mongoose";
import loggers from '../Models/Loggers.js';

export const getReactions=async(req,res)=>{
    try{
        const {id}=req.params;
        const data=await likes.find({postId:mongoose.Types.ObjectId(id)}).sort({ createdDate: -1 }).limit(20).populate('userId');;
        res.send({Error:'NA',Data:data});

    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'getReactions', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        res.send({Error:String(err),Status:"Error"})

    }
}



export const addReaction=async(req,res)=>{
    try{
        const{userId,postId,reaction}=req.body;
        const found=await likes.find({ postId:mongoose.Types.ObjectId(postId),
            userId:mongoose.Types.ObjectId(userId),
            reactionType:reaction})
        if(found!=undefined && found!=null && Array.from(found).length>0){
            res.send({Error:"Already Liked",Data:'Error'});
        }
        else{
        const newReaction=new likes({
            postId:mongoose.Types.ObjectId(postId),
            userId:mongoose.Types.ObjectId(userId),
            reactionType:reaction,
            time:Date.now()
        })
        await newReaction.save();
        const data=await likes.find({_id:mongoose.Types.ObjectId(newReaction._id)}).populate('userId').lean().exec();
        res.send({Error:'NA',Data:data});
    }

    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'addReaction', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        res.send({Error:String(err),Status:"Error"})

    }
}

