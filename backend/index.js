require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT ||4000;
const cors=require("cors");
app.use(cors());
const connectDb=require("./conn/conn");

connectDb();

app.get("/",(req,res)=>{
    res.send("Server is running");
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

