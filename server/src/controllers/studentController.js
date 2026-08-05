const User=require("../models/User");
async function getProfile(req,res){
  try{
    const user=await User.findById(req.user.id).select("-password");

    if(!user){
      return res.status(404).json({
        message:"User not found",
      });
    }
    return res.status(200).json(user);
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function updateProfile(req,res){
  try{
    const {name,department,semester,discordId}=req.body;
    const updateUser=await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        department,
        semester,
        discordId,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");
    if(!updateUser){
      return res.status(404).json({
        message:"User not found",
      });
    }
    return res.status(200).json({
      message:"Profile updated successfully",
      user: updateUser,
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
module.exports={
  getProfile,
  updateProfile,
};