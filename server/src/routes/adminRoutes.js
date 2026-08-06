const express=require("express");
const authenticateUser=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");
const {getAllStudents,deleteStudent,updateStudent,createStudent,}=require("../controllers/adminController")

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
router.post(
    "/students",
    authenticateUser,
    authorizeRoles("admin"),
    createStudent
);
router.delete(
    "/students/:id",
    authenticateUser,
    authorizeRoles("admin"),
    deleteStudent
);
router.put(
    "/students/:id",
    authenticateUser,
    authorizeRoles("admin"),
    updateStudent
);
module.exports=router;