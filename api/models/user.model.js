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
    profilePicture:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    }
}, {timestamps:true} // used for storing creating and updating time of user 
);

const User=mongoose.model("User",userSchema);

export default User;