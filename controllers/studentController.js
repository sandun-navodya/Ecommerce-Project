import Student from '../models/Student.js';

function createStudent(req, res) {
    const newstudent = new Student({
        name: req.body.name,
        age: req.body.age
    });

    newstudent.save().then(() => {
        res.json({ message: "Student created successfully", student: newstudent });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
}

//await method

export async function createStudentasync(req,res){
    try{
        const newstudent = new Student({
            name: req.body.name,
            age: req.body.age
    });

     if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Only admins can create students" });
        }
        
        const savedStudent = await newstudent.save();
        res.json({ message: "Student created successfully", student: savedStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Admin only function to create student
// export async function createStudentAdmin(req, res) {
//     try {
//         // Check if user is authenticated
//         if (!req.user) {
//             return res.status(401).json({ message: "Please login first" });
//         }

//         // Check if user is admin
//         if (!req.user.isAdmin) {
//             return res.status(403).json({ message: "Only admins can create students" });
//         }

//         const newstudent = new Student({
//             name: req.body.name,
//             age: req.body.age
//         });

//         const savedStudent = await newstudent.save();
//         res.json({ message: "Student created successfully", student: savedStudent });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

function getStudents(req, res) {
    Student.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    }); 
}

export { createStudent, getStudents };