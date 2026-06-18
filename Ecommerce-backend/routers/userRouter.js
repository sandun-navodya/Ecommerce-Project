import express from 'express';
import { createUser, loginUser,getUsers,updateUserData,updatePassword } from '../controllers/userController.js';

const userRouter= express.Router();

userRouter.post('/', createUser);
userRouter.post('/login',loginUser);
userRouter.get('/me', getUsers);
userRouter.put('/', updateUserData);
userRouter.put('/password', updatePassword);

export default userRouter;