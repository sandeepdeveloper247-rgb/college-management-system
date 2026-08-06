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

async function updateStudent(req,res){
  try{
    const {id}=req.params;
    const {name,department,semester,discordId}=req.body;
    const student=await User.findById(id);
    if(!student){
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if(student.role!=="student"){
      return res.status(400).json({
        message: "Only student can be updated",
      });
    }

    student.name=name;
    student.department=department;
    student.semester=semester;
    student.discordId=discordId;

    await student.save();

    return res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch(error){
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
}

const bcrypt = require("bcrypt");

async function createStudent(req,res){
  try{
    const {
      name,
      email,
      password,
      department,
      semester,
      discordId,
    }=req.body;

    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const student=await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      department,
      semester,
      discordId: discordId || "",
    });
    return res.status(201).json({
      message: "Student created successfully",
      student,
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
  updateStudent,
  createStudent,
}