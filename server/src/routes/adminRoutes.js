const express=require("express");
const authenticateUser=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");
const {getAllStudents,deleteStudent}=require("../controllers/adminController")

const router = express.Router();

router.get("/dashboard",authenticateUser,authorizeRoles("admin"),(req,res)=>{
  res.status(200).json({
    message: "Welcome Admin!",
    user: req.user
  });

});

router.get(
    "/students",
    authenticateUser,
    authorizeRoles("admin"),
    getAllStudents
);
router.delete(
    "/students/:id",
    authenticateUser,
    authorizeRoles("admin"),
    deleteStudent
);
module.exports=router;