const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');
const cors = require('cors');

const Lesson = require('./models/lessonSchema.js');
const Student = require('./models/studentSchema.js');
const Teacher = require('./models/teacherSchema.js');

///////////////////////////////////////
// CORS CONFIGURATION
///////////////////////////////////////

// List of urls our API will accept calls from
const whitelist = ['http://localhost:3000', 'http://localhost:8000']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

///////////////////////////////////////
// DATABASE - MONGOOSE
///////////////////////////////////////

const db = mongoose.connection;
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/intonation';

// On Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true});
db.once('open', () => {
console.log('connected to mongoose...');
});

// On Error
db.on('error', (err) => {
    console.log(err.message + ' is MongoDB not running?');
});

// On Disconnection
db.on('disconnected', () => {
    console.log("Mongo is disconnected.");
});


///////////////////////////////////////
// MODELS
///////////////////////////////////////



///////////////////////////////////////
// CONTROLLERS
///////////////////////////////////////



///////////////////////////////////////
// MIDDLEWARE
///////////////////////////////////////

app.use(cors(corsOptions)) // cors middlewear, configured by corsOptions
app.use(express.json())
app.use(express.static('build'))

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
});

app.get('/lessons', (req, res) => {
    Lesson.find((error, lessons) => {
        if (!error) {
            res.json(lessons);
        } else {
            console.log(error);
        }
    });
});

app.get('/students', (req, res) => {
    Student.find((error, students) => {
        if (!error) {
            res.json(students);
        } else {
            console.log(error);
        }
    });
});

app.get('/teachers', (req, res) => {
    Teacher.find((error, teachers) => {
        if (!error) {
            res.json(teachers);
        } else {
            console.log(error);
        }
    });
});

///////////////////////////////////////
// CREATE ROUTES
///////////////////////////////////////

app.post('/teachers', (req, res) => {
    try {
        // Destructuring req.body
        const {userName, firstName, lastName, age, bio, students} = req.body;
        
        // Creating new teacher
        const newTeacher = Teacher.create({
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

// app.post('/teachers', (req, res) => {
//     console.log(req.body)
//     try {
//         const newTeacher = Teacher.create({
//             userName: req.body.userName,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             age: req.body.age,
//             bio: req.body.bio,
//             students: req.body.students
//         }, (error, createdTeacher) => {
//             if (error){
//                 console.log(error);
//                 console.log(req.body)
//             } else {
//                 console.log(createdTeacher);
//                 res.json(createdTeacher);
//             }
//         });
//     } catch (error) {
//         console.log(error)
//     }
// });


///////////////////////////////////////
// LISTENING
///////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Port: ${PORT}`); 
    console.log("Hello, Seattle. I'm listening...");
});