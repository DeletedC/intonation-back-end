const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema ({
    book: {
        type: String,
        
    }
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;