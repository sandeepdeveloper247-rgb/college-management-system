const mongoose=require("mongoose");
async function connectMongoDB(url){
  try{
    await mongoose.connect(url);
    console.log("MongoDB Connected");
  }catch(err){
    console.log("MongoDB Connection Failed");
    console.log(err.message);

    process.exit(1);
  }
}

module.exports=connectMongoDB;