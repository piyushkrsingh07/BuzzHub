
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { minLength } from "zod";

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
    minLength:[3,'Username must be atleast 3 characters'],
    match:[
        /^[a-zA-Z0-9]+$/,
        'Username must  contain only letters and numbers'
    ],
   },
   avatar:{
         type:String,
  
    }
},{
    timestamps:true
})

userSchema.pre('save',async function (){
    const user=this;
    const salt=await bcrypt.genSaltSync(10)
    console.log(user.username,"PKKKKKKKKK")
    const hashedPassword=await bcrypt.hashSync(this.password,salt)

    if(!this.avatar) {
    this.avatar=`https://robohash.org/${this.username}`
    console.log(this.avatar,'see avatar')
      console.log("Avatar set to:", user.avatar);
    }

    
})
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User