const express=require("express");
const authenticateUser=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard",authenticateUser,authorizeRoles("admin"),(req,res)=>{
  res.status(200).json({
    message: "Welcome Admin!",
    user: req.user
  });

});

module.exports=router;