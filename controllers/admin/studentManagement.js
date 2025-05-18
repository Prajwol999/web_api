const Student = require("../..models/Student")

const bcrypt = require("bcrypt")

// create

exports.createStudent = async(req,res)=>{
    const{stuid,stu_email,stu_password}= req.body

    // validation
    if(!stu_email || !stu_password){
        return res.status.(400).json({
            "success":false,
            "message":"please fill all the fields"
        })
    }
    try{
        const existingStudent = await.Student.findOne(
            {
                $or:
                [{stu_email:stu_email},{stu_password:stu_password}]
            }
        )
        
    }
}