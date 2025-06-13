const mongoose = require("mongoose")

const CONNECTION_STRING = process.env.MONGODB_URI

const connectDB = async()=>{
    try{
        await mongoose.connect(
            "mongodb://localhost:27017/mydb",
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        )
        console.log("Mongodb connected")
    }catch(error){
        console.error(error.message)
    }
    
}
module.exports = connectDB

