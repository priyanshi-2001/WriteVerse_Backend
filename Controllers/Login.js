import loggers from "../Models/Loggers.js";
import users from '../Models/User.js';
import Comments from '../Models/Comments.js'
import Blogs from '../Models/Blogs.js'
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const login=async(req,res)=>{
    try{
        const { email, password } = req.body;
        
        if(email=="" || password==""){
            res.send({Error:'Error in payload',token:'',userId:'' })
        }
        const userdata = await users.findOne({ email });
        if (!userdata) {
          res.send({ Error: 'Invalid email or password',token:'',userId:'' });
        }
        const isPasswordValid = await bcrypt.compare(password, userdata.password);
        if (!isPasswordValid) {
          res.send({ Error: 'Invalid email or password',token:'',userId:''  });
        }
        const token = jsonwebtoken.sign({ userId: userdata._id }, 'SECRETKEY', { expiresIn: '24h' });
        if(email=="admin@gmail.com"){
            return res.send({Error:'Admin Login','token':token,'userId':userdata._id })
        }
        res.send({Error:'NA','token':token,'userId':userdata._id });

    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'login', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        newLogger.save();
        res.send({'Error':String(err),'Status':'Error'})

    }
}

export const signup=async(req,res)=>{
    try{
        const{email,Name,password}=req.body;
        if(email==""){
            res.send({Error:'Error in payload',Status:"Error"});
        }
        const userdata = await users.findOne({ email });
        if(!userdata){
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser=new users({
            password:hashedPassword,
            email:email,
            Name:Name,
            dateCreated:Date.now()
        })
        await newUser.save();

        res.send({Error:'NA',Status:'Success'});
    }
    else{
        res.send({Error:"User exists",Status:"User exists"});
    }

    }
    catch(err){
        console.log("err",err);
        const newLogger=new loggers([{ 
            uniqueIdentifier:'signup', 
            errorValue: String(err),
            DateCreated:Date.now(),
            DateModified:Date.now(),
        }])
        newLogger.save();
        
        res.send({Error:String(err),Status:"Error"})

    }
}

