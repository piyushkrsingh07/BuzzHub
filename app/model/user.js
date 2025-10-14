import { match } from "assert";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
   email:{
    type:String,
    required:[true,'Email is required'],
    unique:[true,'Email already exist'],
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        'Please fill a valid email address']
    
   },
   password:{
    type:String,
    required:[true,'Password is required']
   },
   username:{
    type:String,
    required:[true,'Username is required'],
    unique:[true,'Username already exist'],
    match:[
        /^[a-zA-Z0-9]+$/,
        'Username must  contain only letters and numbers'
    ],
    avatar:{
         type:String
    }
   }
},{
    timestamps:true
})

userSchema.pre('save',async function saveUser(){
    const user=this;
    user.avatar=`https://robohash.org/${user.username}`

})
const User=mongoose.model('User',userSchema)

export default User