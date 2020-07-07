const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema ({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    age: {
        type: Number,
        required: false,
        default: null,
        unique: false
    },
    bio: {
        type: String,
        required: false,
        default: null,
        maxlength: 1000,
        unique: false
    },
    level: {
        type: Number,
        required: true,
        unique: false,
        default: 1
    },
    teacher: [{
        type: String,
        required: true,
        default: {}
    }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;