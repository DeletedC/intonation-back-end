const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema ({
    name_first: {
        type: String,
        required: true,
        unique: false
    },
    name_last: {
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
        default: null,
        unique: false
    }]
});


const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;