import express from "express";
import cors from "cors"
import bcrypt from "bcrypt"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {v2  as cloudinary} from 'cloudinary'
import fileUpload from "express-fileupload";

dotenv.config();
export const app = express();
app.set('view engine', 'ejs');
import cookieParser from 'cookie-parser';
app.use(cookieParser('keyforcookie'));
app.use(cors());
// app.use(cors({
//   origin:['https://blogging-website-assignment-gfgr.vercel.app/'],
//   method:["GET","POST"],
//   credentials:true
// }));
app.use(
  fileUpload({
      createParentPath: true,
  }),
);
import jwt from 'jwt-decode'
import user from './Models/User.js'

import {connectDB} from './db/conn.js'
connectDB()
import './Routes/routes.js'
import http from 'http';
const server = http.createServer(app);
import router from "./Routes/routes.js";
const port=8000
import bodyParser from "body-parser";
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(router);
cloudinary.config({ 
  cloud_name: 'dnjulnxw9', 
  api_key: '982739696374357', 
  api_secret: 'Z1c5TrgsOXhet3utEya0GW_UgnY' 
});
cloudinary.uploader.upload


server.listen(port,()=>{
    console.log(`connection is set up at ${port}`);

})

