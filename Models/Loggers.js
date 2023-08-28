import mongoose from "mongoose";
const Schema=mongoose.Schema
const loggersSchema=new Schema({
category:{
    type:String
},
uniqueIdentifier:{
    type:String,
},
errorValue:{
    type:String,
},
refValue1:{
    type:String
},
refValue2:{
    type:String
},
refValue3:{
    type:String
},
DateCreated : { type : Date, default: Date.now },
DateModified : { type : Date, default: Date.now }
})
const loggers= mongoose.model("loggers",loggersSchema);
export default loggers
