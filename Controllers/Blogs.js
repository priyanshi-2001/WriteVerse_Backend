import Comments from '../Models/Comments.js';
import Blogs from '../Models/Blogs.js';
import user from '../Models/User.js';
import loggers from "../Models/Loggers.js";
import mongoose, { mongo } from "mongoose";
import {v2 as cloudinary} from 'cloudinary';
import blogs from '../Models/Blogs.js';
import comments from '../Models/Comments.js';
import likes from '../Models/Likes.js';

export const fetchBlogs=async(req,res)=>{
    try{
        const data=await Blogs.find({}).sort({ modifiedDate: -1 }).populate('userId');
       
        res.send({Error:'NA',Data:data});
    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'fetchBlogs', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        res.send({Error:String(err),Status:"Error"})

    }
}


export const createBlog=async(req,res)=>{
    try{

        const body=req.body;
        const file=req.files!==null ? req.files['files']:[];
      
        
        var encodedData=[];
        if(Array.isArray(file)){
        

        for(let i=0;i<file.length;i++){
            var base64encoded=Buffer.from(file[i]['data']).toString('base64');
            try{
                var startString='';
                if(base64encoded.toString().startsWith("iVB")){
                    startString='data:image/png;base64,';
                }
                if(base64encoded.toString().startsWith('JVB')){
                    startString='data:application/pdf;base64,';
                }
          
            const uploadResponse=await cloudinary.uploader.upload(
                startString + base64encoded,{
                    upload_preset:'posts'
                },
            )
            console.log("uploadResponse");
            encodedData.push(uploadResponse.url.replace("http","https"));
            }
            catch(err){
                console.log("err",err)
            }
        }
    }
    else if(file !==[]){

        var base64encoded=Buffer.from(file['data']).toString('base64');
        try{
            var startString='';
            if(base64encoded.toString().startsWith("iVB")){
                startString='data:image/png;base64,';
            }
            if(base64encoded.toString().startsWith('JVB')){
                startString='data:application/pdf;base64,';
            }
      
        const uploadResponse=await cloudinary.uploader.upload(
            startString + base64encoded,{
                upload_preset:'posts'
            },
        )
        console.log("uploadResponse");
        encodedData.push(uploadResponse.url.replace("http","https"));
        }
        catch(err){
            console.log("err",err)
        }
    }
       
      
        const blogsRec=new Blogs({
           
            userId:mongoose.Types.ObjectId(body['userId']),
            // title:body['title'],
            body:body['body'],
            files:JSON.stringify(encodedData),
            createdDate:new Date(),
            modifiedDate:new Date(),
            isActive:true
        })
        await blogsRec.save();
        res.send({Error:'NA',status:'success','blogsRec':blogsRec,'encodedData':encodedData})

    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'createBlog', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        await newLogger.save();
        res.send({Error:String(err),Status:"Error"})

    }
}


export const updateBlog=async(req,res)=>{
    try{

        const {blogId,description,currentFiles}=req.body;

        const file=req.files!==null ? req.files['files']:[];
      
        
        var encodedData=JSON.parse(currentFiles);
        if(Array.isArray(file)){
        

        for(let i=0;i<file.length;i++){
            var base64encoded=Buffer.from(file[i]['data']).toString('base64');
            try{
                var startString='';
                if(base64encoded.toString().startsWith("iVB")){
                    startString='data:image/png;base64,';
                }
                if(base64encoded.toString().startsWith('JVB')){
                    startString='data:application/pdf;base64,';
                }
          
            const uploadResponse=await cloudinary.uploader.upload(
                startString + base64encoded,{
                    upload_preset:'posts'
                },
            )
            console.log("uploadResponse");
            encodedData.push(uploadResponse.url.replace("http","https"));
            }
            catch(err){
                console.log("err",err)
            }
        }
        }
        else if(file !==[]){

            var base64encoded=Buffer.from(file['data']).toString('base64');
            try{
                var startString='';
                if(base64encoded.toString().startsWith("iVB")){
                    startString='data:image/png;base64,';
                }
                if(base64encoded.toString().startsWith('JVB')){
                    startString='data:application/pdf;base64,';
                }
        
            const uploadResponse=await cloudinary.uploader.upload(
                startString + base64encoded,{
                    upload_preset:'posts'
                },
            )
            console.log("uploadResponse");
            encodedData.push(uploadResponse.url.replace("http","https"));
            }
            catch(err){
                console.log("err",err)
            }
        }
       

    const updatedRecord=await Blogs.findByIdAndUpdate({_id:mongoose.Types.ObjectId(blogId)},{ 
        $set:{files:JSON.stringify(encodedData),body:description,modifiedDate:Date.now()}
    },{new:true});
    console.log("updatedRecord",updatedRecord);
    
    res.send({Error:"NA",Data:updatedRecord});



    }
    catch(err){
        console.log("err",err);
        loggers.create([{ 
            uniqueIdentifier:'updateBlog', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
           .then(result => {
            console.log(result)
        })
        res.send({Error:String(err),Data:"Error"})

    }
}


export const deleteBlog=async(req,res)=>{
    try{
        const {blogId}=req.body;
        const deletedRecord=await Blogs.findByIdAndDelete({_id:mongoose.Types.ObjectId(blogId)});
        console.log({deletedRecord})
        if(deletedRecord){
            const likesRecords= await likes.deleteMany({ postId: mongoose.Types.ObjectId(blogId) });
            const commentRecords=await comments.deleteMany({ postId: mongoose.Types.ObjectId(blogId) });
            console.log({commentRecords},{likesRecords})
        res.send({Error:"NA",Status:"Success"})
        }
        else{
            res.send({Error:"Error Occurred",Status:"Error"})
        }
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

