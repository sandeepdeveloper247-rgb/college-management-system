const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const authRoutes=require("./routes/authRoutes");
const app=express();
const adminRoutes=require("./routes/adminRoutes");

//POST /api/auth/register

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
module.exports=app;