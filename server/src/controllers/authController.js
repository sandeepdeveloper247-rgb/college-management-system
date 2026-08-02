const User=require("../models/User");
const bcrypt=require("bcrypt");

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
module.exports={
  registerUser
};