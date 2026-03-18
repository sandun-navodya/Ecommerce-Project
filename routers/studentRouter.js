import express from 'express';
import mongoose, { get } from 'mongoose';
import Student from '../models/Student.js';
import { createStudent, createStudentasync, getStudents} from '../controllers/studentController.js';
import authUser from '../middlwares/authentication.js';

const studentRouter = express.Router();

studentRouter.get('/', getStudents);

studentRouter.post('/', createStudentasync);

// Admin only route to create student
//studentRouter.post('/admin/create', authUser, createStudentAdmin);

export default studentRouter;