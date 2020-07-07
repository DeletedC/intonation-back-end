const TeacherRouter = require('express').Router();

const Teacher = require('../models/teacherSchema.js');

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

// INDEX ROUTE
TeacherRouter.get('/', (req, res) => {
    Teacher.find((error, teachers) => {
        if (!error) {
            res.json(teachers);
        } else {
            console.log(error);
        }
    });
});


// CREATE ROUTE
TeacherRouter.post('/', async (req, res) => {
    try {
        // Destructuring req.body
        const {userName, firstName, lastName, age, bio, students} = req.body;
        
        // Creating new teacher
        const newTeacher = await Teacher.create({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            age: age,
            bio: bio,
            students: students
        }, (error, createdTeacher) => {
            if (error){
                console.log(error);
                console.log(req.body)
            } else {
                console.log(createdTeacher);
                res.json(createdTeacher);
            }
        });
    } catch (error) {
        console.log(error)
    }
});

// UPDATE ROUTE
TeacherRouter.put('/:userName', async (req, res) => {
    try {
        // Destructuring req.body and req.params
        const {firstName, lastName, age, bio, students} = req.body;
        const {userName} = req.params.userName;

        // Updating teacher
        const editTeacher = await Teacher.findOneAndUpdate(userName, {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            age: age,
            bio: bio,
            students: students
        }, (error, editedTeacher) => {
            if (error){
                console.log(error);
                console.log(req.body)
            } else {
                console.log(editedTeacher);
                res.json(editedTeacher);
            }
        });
    } catch (error) {
        console.log(error)
    }
});

// DELETE ROUTE
TeacherRouter.delete('/:userName', async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findOneAndDelete(req.params.userName)
        res.status(200).json(deletedTeacher)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = TeacherRouter;