import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import authUser from './middlwares/authentication.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import cors from 'cors';  
import dotenv from 'dotenv';

dotenv.config();

const mongodbURI = process.env.MongoDB_URI;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.use(authUser);
 
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);






mongoose.connect(mongodbURI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});




function go() {
    console.log("Hello World");

}

app.listen(3000, go);

