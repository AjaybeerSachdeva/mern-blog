import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password==='')
    {
        return next(errorHandler(400,"All fields are required"));
    }
    const hashedPassword=bcrypt.hashSync(password, 10);
    const newUser=new User({username,email,password:hashedPassword}); 
    try{
        await newUser.save();
        res.status(200).json({message:"Signup success"});
    }
    catch(error)
    {
        next(error);
    }
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password || email==='' || password==='')
    {
        return next(errorHandler(400,"All fields are required"));
    }
    try{
    const existingUser=await User.findOne({email});
    if(!existingUser)
    {
        return next(errorHandler(404,"User does not exist"));
    }
    const validPassword=bcrypt.compareSync(password, existingUser.password); 
    if(validPassword===false)
    {
        return next(errorHandler(400,"Wrong credentials!"));
    }
    const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY);
    const {password:pass,...rest}=existingUser._doc;
    res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    }
    catch(error)
    { 
        next(error);
    }
}

export const google=async(req,res,next)=>{
    const {name,googlePhotoUrl,email}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY);
            const {password,...rest}=existingUser._doc;
            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        }
        else{
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcrypt.hashSync(generatedPassword,10);
            const newUser=new User({username:name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email,password:hashedPassword,profilePicture:googlePhotoUrl});
                await newUser.save();
                const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY);
                const {password,...rest}=newUser._doc;
                res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
    } 
    catch(error)
    {
        next(error);
    }


}