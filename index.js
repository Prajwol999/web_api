require('dotenv').config() // for .env file

const express = require("express")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const studentRoutes = require("./routes/studentRoutes")
const adminUserRoutes = require("./routes/admin/adminUserRoute")
const adminCategoryRoutes = require("./routes/admin/adminCategoryRoute")
const adminProductRoutes = require("./routes/admin/productRoute")






 //accept json in request

const app = express()
connectDB()
app.use(express.json())

// implement routes here
app.use("/api/auth/",userRoutes)
app.use('/api/v1/students', studentRoutes);
app.use("/api/admin/user",adminUserRoutes)
app.use("/api/admin/category",adminCategoryRoutes);
app.use("/api/admin/products", adminProductRoutes);

app.get("/",(req,res)=>{
    return res.status(200).send("Hello world!!")
})

const users = [
    {id:1,name:"shubham",email:"suryathebravesoldier@gmail.com"},
    {id:2,name:"aman",email:"amanch@gmail.com"},
    {id:3,name:"dipendra",email:"depressionisafraidofme@gmail.com"}
]

app.get("/users/:id",(req,res)=>{
    let id  = req.params.id
    let found
    for(user of users){
        if(user.id == id){
            found = user
            break
        }
    }
    if(!found){
        return res.status(400).send("failure")
    }
    if(req.query.name && req.query.name== found.name){
        return res.status(200).send("success")
    }
    else{
        return res.status(500).send("server error")
    }
}
)

const PORT = process.env.PORT

app.listen(
    8080,
    ()=>{
        console.log("server started")
    }
)

// create a model student
// studid:unique,required
// stu_name
// stu_email - unique,required

// create controller for student
// create 2 api
// createStudent - check/validate also if empty or not
// getAll user Model.find()
//  create route and use it "/api/v1/students"


// app.get("/post/:id",(req,res)=>{
//     console.log(req.params.id)   //:id
//     console.log(req.query)
//     return res.status(200).send("success")
// })



    // make a get request called /users
    // that takes dynamic id as params
    // if id is not present in users send bad response with "failure"
// check url query and search for name
// if name is present and name matches the user with th id
// send success response with "sucess"
// else send 500 response with "server error"

// app.get("/users/:id"),(req,res)=>{
    
//     const userID = req.params.id
//     const user = users.find(user=>user.id==userID)
//     if(!user){
//         return res.status(200).send(user)
//     }
//     const name = req.query.name
//     if(name && name == user.name){
//         return res.status(200).send(user)
//     }
//     else{
//         return res.status(500).send("server error")
//     }
// }








// HTT response CODE

// 200-20x =>success response
// 300-30x -> redirect response
// 400-40x -> Bad response
// 404-> not found
// 401-> forbidden
// 403 -> unauthorized
// 500-50x -> server error


// multiple type of request as :GET,POST,PUT,PATCH,DELETE.....

// route blogs
// get blogs
// create blogs
// edit blogs
// delete blogs

let  blogs = [
    {id:1,name:"Nikesh",title:"Trip to pokhara",desc:"desc"},
    {id:2,name:"Aman",title:"Trip to heaven",desc:"desc"},
    {id:2,name:"Shubham",title:"Trip to india",desc:"desc"}
    
]

// local db/blogs
app.get("/blogs/",(req,res)=>{
    return res.status(200).json(
        {
            "success":true,
            "blogs":blogs

        }
    )
    }
)

// single blog

app.get("/blogs/:blogId",(req,res)=>{
    let blogId = req.params.blogId

    // search
  let search 
    for(blog of blogs){
        if(blogId==blog.id){
            search = blog
            break
        }
    }
    if(search){
        return res.status(200).json(
            {
                "success":true,
                "blog":search
            }
        )
    }else{
        return res.status(404).json(
            {
                "success":true,
                "message":"blog not"
            }
        )
    }
})

// data add/add to blogs
app.post("/blogs/",(req,res)=>{

    console.log("Body",req.body) //all request
    const{id,name,title,desc} = req.body

// validation
if(!id || !name || !title || ! desc){
    return res.status(404).json(
        {
            "success":true,
            "message":"validation done "
        }
    )
}
    blogs.push(
        {
            id,
            name,
            title,
            desc
        }
    )
    return res.status(200).json({
        "success":true,
        "message":"blog added"
    })




})

// update put/patch -> data update
// put -> complete change
// patch -> partial change

app.put("/blogs/:blogId",(req,res)=>{
    let blogId = req.params.blogId
    let foundIdx
    for(blogIdx in blogs){
        if(blogId[blogIdx]==blogId){
            foundIdx = blogIdx
            break
        }
    }
    const{name,title,desc} = req.body
    blogs[foundIdx].name = name
    blogs[foundIdx].title = title
    blogs[foundIdx].desc = desc
    return res.status(200).json(
        {
            "success":true,
            "message":"Blog updated"
        }
    )
})

// delete
app.delete("/blogs/:blogId", (req, res) => {
    let blogId = req.params.blogId;
    blogs = blogs.filter((blog) => blog.id != blogId);
    return res.status(200).json({
        success: true,
        message: "Blog deleted"
    });
});


// task create a new middle ware isStudent
// check if user role is student or admin
// create two user,one normal,one student
// apply the middlewares in all the get routes od studentRoute












