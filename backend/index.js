require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT ||4000;
const cors=require("cors");
app.use(cors());
const connectDb=require("./conn/conn");
const authRoute=require("./routes/auth");

const eventRoute=require("./routes/event");

const bookingRoute=require("./routes/booking");


connectDb();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is running");
})
app.use("/api/auth",authRoute);

app.use("/api/event",eventRoute);
app.use("/api/booking",bookingRoute);

console.log("Auth route loaded");
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

