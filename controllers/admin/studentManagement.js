const Student = require("../../models/Student"); // Fix path
const bcrypt = require("bcrypt");

// create
exports.createStudent = async (req, res) => {
    const { stuid, stu_email, stu_password } = req.body;

    // validation
    if (!stuid || !stu_email || !stu_password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields (stuid, stu_email, stu_password)"
        });
    }

    try {
        // Check if student with same email or ID exists
        const existingStudent = await Student.findOne({
            $or: [{ stu_email }, { stuid }]
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Student with the given email or ID already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(stu_password, 10);

        // Create and save new student
        const newStudent = new Student({
            stuid,
            stu_email,
            stu_password: hashedPassword
        });

        await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: {
                stuid: newStudent.stuid,
                stu_email: newStudent.stu_email
            }
        });
    } catch (err) {
        console.error("Error creating student:", err);
        res.status(500).json({
            success: false,
            message: "Server error while creating student"
        });
    }
};
