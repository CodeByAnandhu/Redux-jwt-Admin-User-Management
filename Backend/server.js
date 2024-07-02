
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFount , errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import userRouter from './router/userRoutes.js'
import adminRouter from './router/adminRouter.js'
import cors from 'cors';
 



const PORT  = process.env.PORT || 5000;
const app = express();
connectDB();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());    
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);

app.get('/',(req,res)=>res.send('Server is running'))

app.use(notFount);
app.use(errorHandler);

app.listen(PORT,()=>console.log(`Server is running on port http://localhost:${PORT}`))

