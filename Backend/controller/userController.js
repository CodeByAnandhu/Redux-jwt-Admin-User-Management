import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'
 
export const userAuth = asyncHandler(async (req, res)=>{
   
    const {email,password} = req.body;
 
   const user = await User.findOne({email:email});
   if(user && (await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(200).json({
        _id:user._id,
        name:user.name, 
        email:user.email,
      })
   } else{
    res.status(401)
    throw new Error("Invalid Email or Password")
   }

});


export const registerUser = asyncHandler(async (req, res)=>{
   
   const {name,email,password} = req.body;
   const existUser = await User.findOne({email:email});

   if(existUser){
    res.status(400)
    throw new Error("User already exists")
   }

   const user = await User.create({
    name,
    email,
    password,
    profilePic:''
   })

   if(user){
      generateToken(res,user._id)
       res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        profilePic:user.profilePic
      })
   } else{
       res.status(400)
    throw new Error("User not created")
   }

});



export const logOut = asyncHandler(async (req, res)=>{
   
   res.cookie("jwt","",{
    httpOnly:true,
    secure:false,
    maxAge:1
   });

   res.status(200).json({message:"User Logged Out"});

});


export const getUserProfile = asyncHandler(async (req, res)=>{

   const user ={
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    profilePic:req.user.profilePic
   }
 
   res.status(200).json(user);

});


export const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
   
      if (req.file) {
        user.profilePic = `/uploads/${req.file.filename}`;
      }
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();

      const token = generateToken(res,updatedUser._id);
      
      
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        isAdmin: updatedUser.isAdmin,
        token: token,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  