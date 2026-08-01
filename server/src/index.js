const dotenv=require("dotenv");
dotenv.config();

const app=require("./app");
const connectMongoDB=require("./config/db");
const PORT=process.env.PORT || 8005;
connectMongoDB(process.env.MONGO_URL).then(()=>{
  app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});
});