import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";

connectDB();

cloudinary.v2.config({
   cloud_name:dssau0rhs,
   api_key: 835644199477898,
   api_secret:WgB7tzMBgZh0KAi3bhBM-DaDiU8 
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
   console.log(`Server is running on port ${PORT}`);
})