const express=require("express");
const { verify } = require("jsonwebtoken");
const {login,register,verifyOtp}=require("../controllers/authConn");

const router=express.Router();
console.log("Auth routes file running");

router.post("/login",login);
router.post("/register",register);
router.post("/verifyOtp",verifyOtp);


module.exports=router;