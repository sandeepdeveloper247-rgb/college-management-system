const User=require("../models/User");

async function getAllStudents(req,res){
  try{
    const students=await User.find({role: "student"}).select("-password").sort({createdAt:-1});
    return res.status(200).json(students);
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteStudent(req,res){
  try{
    const {id}=req.params;
    const student=await User.findById(id);

    if(!student){
      return res.status(404).json({
        message: "Student not found",
      });
    }
    if(student.role!=="student"){
      return res.status(400).json({
        message: "Only students can be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch(error){
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
module.exports ={
  getAllStudents,
  deleteStudent,
}