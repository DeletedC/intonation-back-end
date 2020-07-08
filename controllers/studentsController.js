const StudentRouter = require('express').Router();

const Student = require('../models/studentSchema.js');

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

// INDEX ROUTE
StudentRouter.get('/', (req, res) => {
    try {
        Student.find((error, students) => {
        
            if (!error) {
                res.json(students);
            } else {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// CREATE ROUTE
StudentRouter.post('/', async (req, res) => {
    try {
        // Destructuring req.body
        const {userName, firstName, lastName, age, bio, level, teacher} = req.body;
        
        // Creating new student
        const newStudent = await Student.create({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            age: age,
            bio: bio,
            level: level,
            teacher: teacher
        }, (error, createdStudent) => {
            if (error){
                console.log(error);
                console.log(req.body)
            } else {
                console.log(createdStudent);
                res.json(createdStudent);
            }
        });
    } catch (error) {
        console.log(error)
    }
});

// UPDATE ROUTE
StudentRouter.put('/:userName', async (req, res) => {
    try {
        // Destructuring req.body and req.params
        const {firstName, lastName, age, bio, teacher} = req.body;
        const {userName} = req.params.userName;

        // Updating student
        const editStudent = await Student.findOneAndUpdate(userName, {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            age: age,
            bio: bio,
            teacher: teacher
        }, (error, editedStudent) => {
            if (error){
                console.log(error);
                console.log(req.body)
            } else {
                console.log(editedStudent);
                res.json(editedStudent);
            }
        });
    } catch (error) {
        console.log(error)
    }
});

// DELETE ROUTE
StudentRouter.delete('/:userName', async (req, res) => {
    try {
        const deletedStudent = await Student.findOneAndDelete(req.params.userName)
        res.status(200).json(deletedStudent)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = StudentRouter;