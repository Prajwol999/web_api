const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studid: {
        type: Number,
        required: true,
        unique: true
    },
    stu_name: {
        type: String,
        required: true
    },
    stu_email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
