import Admin from "../model/adminModal.js";
import User from "../model/userModel.js";

import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req,res)=>{
 
    
    const {email,password} = req.body; 
    const admin = await Admin.findOne({email:email , password:password});  

    if(admin){
        generateToken(res,admin._id)
        res.status(200).json({
            _id:admin._id,
            name:admin.name, 
            email:admin.email,
          })

    } else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }

}


export const getUserData = async (req,res)=>{
 
    try{
        const users = await User.find();
        
        res.status(200).json(users);
   }catch(error){
       res.status(404)
       throw new Error("User not found")
   }

}

export const editUser = async (req,res)=>{
    
    const {name , profilePic , email , password , userId} = req.body;
   
    const user = await User.findById(userId);
    if(user){ 
        user.name = name || user.name;  
        user.profilePic = profilePic || user.profilePic;
        user.email = email || user.email;
        user.password = password || user.password;
        const updatedUser = await user.save(); 
        res.status(200).json(updatedUser);
    }else{
        res.status(404) 
        throw new Error("User not found")
    }
 
}


export const deleteUser = async (req,res)=>{
   
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(user){

        res.status(200).json({message:"User deleted successfully"})
    }else{
        res.status(404)
        throw new Error("User not found")
    }
}


export const createUser = async (req,res)=>{
   
    const {name , email , password} = req.body;
    const user = await User.create({name , email , password});

    if(user){
        res.status(200).json({message:"User created successfully"})
    }else{
        res.status(404)
        throw new Error("User not found")
    }
}