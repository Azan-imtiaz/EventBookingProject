const User=require("../models/userModel");
const {sendOtpEmail}=require("../utils/email");
const Otp=require("../models/otpModel");
const bcrypt=require("bcryptjs");
async function login(req,res){
   console.log("Login function called");
}

async function register(req,res){
    console.log("Register function called");
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const otp=Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({email,otp,action:"account_verification"});
        await sendOtpEmail(email, otp, "account_verification","");
        return res.status(201).json({ message: "User registered successfully, Please verify your email",email:email });
    }catch(err){
        console.error("Error occurred during registration:", err);
        return res.status(500).json({error:err.message});
    }

}

async function verifyOtp(){
    console.log("Verify OTP function called");
}

module.exports={
    login,register,verifyOtp
}