const Student = require('../models/Student');


const createStudent = async (req, res) => {
    const { studid, stu_name, stu_email } = req.body;

    
    if (!studid || !stu_name || !stu_email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const student = new Student({ studid, stu_name, stu_email });
        await student.save();
        res.status(201).json({ message: 'Student created', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents
};
