import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
   console.log(`Server is running on port ${PORT}`);
})