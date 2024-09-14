import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import  connect  from './config/database.js'
import cookieParser from 'cookie-parser'; 
connect()
import authRoutes from './routes/auth.js'

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());


app.use("/auth",authRoutes)




const port = process.env.Port || 6000;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})

