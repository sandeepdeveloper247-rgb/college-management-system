const { default: mongoose } = require("mongoose");
const mogoose=require("mongoose");
const userSchema=new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password:{
      type: String,
      required: true,
    },
    role:{
      type: String,
      enum:["student","admin"],
      default: "student",
    },
    department:{
      type: String,
      required: true,
    },
    semester:{
      type: Number,
      required: true,
    },
    discordId:{
      type: String,
      default: "",
    },
    avatar:{
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("User",userSchema);