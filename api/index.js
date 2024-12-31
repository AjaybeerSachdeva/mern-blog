import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';

const app=express();

app.use("/user",userRouter);


dotenv.config();
mongoose.connect(process.env.MONGO).then
(()=>{console.log("Database is connected successfully")})
.catch(error=>{
    console.log(error);
})


app.listen(3000,()=>{
    console.log('Backend working on port 3000');
}); 



