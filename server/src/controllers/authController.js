const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
  try{
    const {
      name,
      email,
      password,
      department,
      semester,
      role
    }=req.body;

    if(!name || !email || !password || !department || !semester){
      return res.status(400).json({
        message:"All fields are required."
      });
    }
    const existingUser=await User.findOne({email});

    if(existingUser){
      return res.status(409).json({
        message: "Email already registered."
      });
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
      name,
      email,
      password: hashedPassword,
      department,
      semester,
      role
    });

    res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        semester: user.semester
    }
});
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error."
    });
  }
}

async function loginUser(req,res){
  try{
    const{email,password}=req.body;

    if(!email || !password){
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user=await User.findOne({email});

    if(!user){
      return res.status(404).json({
        message: "User not found."
      });
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({
        message: "Invalid credentials."
      });
    }
    // console.log(process.env.JWT_SECRET);
    const token=jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error."
    });
  }
}

async function getCurrentUser(req,res){
  try{
    const user=await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  }catch(error){
    return res.status(500).json({
      message: "Internal Server Error."
    });
  }
}
module.exports={
  registerUser,
  loginUser,
  getCurrentUser
};