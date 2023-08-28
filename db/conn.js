import mongoose from "mongoose";
// export const connectDB = async () => {
//   const { connection } = await mongoose.connect("mongodb://localhost:27017/BloggingWebsite");
//   console.log(`Mongodb is connected with ${connection.host}`);
// };
export const connectDB = async () => {
  const { connection } = await mongoose.connect("mongodb+srv://priyanshi:Priya%4030@cluster0.bltxyu7.mongodb.net/BloggingWebsite");
  console.log(`Mongodb is connected with ${connection.host}`);
};
