import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema=new mongoose.Schema({
    username: 
    {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamps:true} // used for storing creating and updating time of user 
);

const User=mongoose.model("User",userSchema);

export default User;