import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {authorize} from '../Middleware/Authentication.js';
import{createBlog,deleteBlog,updateBlog,fetchBlogs} from '../Controllers/Blogs.js';
import {addComment,getComments} from '../Controllers/Comments.js';
import {login,signup} from '../Controllers/Login.js';
import {addReaction,getReactions} from '../Controllers/Reactions.js';
import cors from 'cors';
var app = express();
import bodyParser from "body-parser";
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();

router.route("/").get(async(req,res)=>{
  res.json("Hello");
})

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/createBlog").post(authorize,createBlog);
router.route("/fetchBlogs").get(authorize,fetchBlogs);
router.route("/addComment").post(authorize,addComment);
router.route("/getComments/:id").get(authorize,getComments);
router.route("/getReactions/:id").get(authorize,getReactions)
router.route("/deleteBlog").post(authorize,deleteBlog)
router.route("/updateBlog").post(authorize,updateBlog);
router.route("/addReaction").post(authorize,addReaction);

export default router;
