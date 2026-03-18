import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import authUser from './middlwares/authentication.js';
import productRouter from './routers/productRouter.js';


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(authUser)


app.use('/users', userRouter);
app.use('/products', productRouter);

const mongodbURI = "mongodb+srv://admin:1234@cluster0.pjfcnc5.mongodb.net/test1?appName=Cluster0"



mongoose.connect(mongodbURI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});




function go() {
    console.log("Hello World");

}

app.listen(3000, go);

