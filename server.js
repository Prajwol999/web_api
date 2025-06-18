require("dotenv").config()
const app= require("./index")



app.listen(
    8080,
    ()=>{
        console.log("server started")
    }
)