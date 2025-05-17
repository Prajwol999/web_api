const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    stuId: {
        type: Number,
        required: true,
        unique: true
    },
    stuName: {
        type: String,
        required: true
    },
    stuEmail: {
        type: String,
        required: true,
        unique: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
