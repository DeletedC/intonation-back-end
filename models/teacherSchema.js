const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema ({
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
    students: [{
        type: Object,
        default: {},
        unique: false
    }]
});


const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;