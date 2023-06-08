import bcrypt from"bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* Register */

export const register = async(req,res)=>{
  try{
   const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,occupation
   }=req.body;
   const salt = await bcrypt.genSalt();
   const passwordHash = await bcrypt.hash(password.salt);
   const newUser = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
    picturePath,
    friends,
    location,occupation,
    viewedProfile:Math.floor(Math.random()*10000),
    impressions:Math.floor(Math.random()*10000),
   });
   const savedUser = await newUser.save();
   res.status(201).json(savedUser);
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

/* Login in */

export const login = async(req,res)=>{

  try{

    const{
      email,
      password
    }= req.body
    const user =  await user.findOne({email:email});
    if(!user) return res.status(400).json({message:"User does not exist."})

    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)return res.status(400).json({message:"Invalid credentials."});

    const token = jwt.sign({id:user_id},process.env.JWT_SECRET);

    /* delet user password does not  send back to front end */
    delete user.password;
    res.status(201).json({token,user});
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

