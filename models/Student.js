import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,

    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
});

const Student = mongoose.model('Student', studentSchema);


export default Student;
