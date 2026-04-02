const mongoose=require('mongoose');

async function connectDb(){
    try{
     let con=await mongoose.connect(process.env.MONGODB_URI);
     console.log("Database connected successfully");
    }catch(err){
        console.log("Something went wrong in db connection: ", err);
    }
}

module.exports= connectDb;