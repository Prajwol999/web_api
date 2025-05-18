// CRUD 

const User = require("../../models/User")
const bcrypt = require("bcrypt")

// create
exports.createUser = async(req,res)=>{
    const {username,email,firstName,lastName,password} = req.body

    // validation
    if(!username || !email || !firstName || !lastName || !password){
        return res.status(400).json({
            "success":false,"message":"please fill all the fields"
        })
    }
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
        const newUser = new User(
            {
                username:username,
                email:firstName,
                lastName:lastName,
                password:hashedPassword
            }
        )
        await newUser.save()
        return res.status(201).json({"success":true,"msg":"User registered"})

    }catch(e){
        return res.status(500).json(
            {
                "success":false,
                "message":"server error"

            }
        )

    }
}

    // read all

    exports.getUsers = async(req,res)=>{
        try{
            const users = await User.find();
            return res.status(200).json(
                {
                    "success":true,
                    "message":"Data fetched",
                    "data":users
                }
            )
        }catch(err){
            return res.status(500).json({
                "success":false,
                "message":"servor error"
            })
        }
    }
    exports.getOneUser = async(req,res)=>{
        try{
            const _id = req.params._id
            const user = user.findById(id)
            return res.status(200).json(
                {
                    "success":true,
                    "message":"one user fetched",
                    "data":user
                }
            )
        }catch(err){
            return res.status(500).json({
                "success":false,"message":"server Error"
            })
        }
    }
    // update 
    exports.updateOneUser = async(req,res)=>{
        const{firstName,lastName} = req.body
        const _id = req.params.id
        try{
            const user = User.updateOne(
                {
                    "_id":_id
                },
                {
                    $set:{
                        "firstName":firstName,
                        "lastName":lastName
                    }
                }

            )
            return res.status(200).json(
                {
                    "success":true,"message":"user data updated"
                }
            )

        }catch(err){

            return res.status(500).json({
                "success":false,"message":"server error"
            })

        }
    }

    // delete

    exports.deleteOneUser = async(req,res) =>{
        try{
            const _id = req.params.id
            const user = await user.deleteOne(
                {
                    "_id":"_id"
                }
            )
            return res.status(200).json(
                {"success":true,"message":"user deleted"}
            )
        }
        catch(err){
            return res.status(500).json({
                "success":true,"message":"server error"
            })
        }
    }

