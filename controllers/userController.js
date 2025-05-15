const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.registerUser = async(req,res)=>{

    const {username,email,firstName,lastName,password} = req.body
    try{
        const existingUser = await User.findOne(
            {
                $or:[{username:username},{email:email}]
            }
        )
        if(existingUser){
            return res.status(400).json({"success":false,"msg":"User exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10) // 10 salt/complexity

    }catch(e){
        return res.status(500).json(
            {
                "success":false,
                "message":"server error"

            }
        )

    }
}