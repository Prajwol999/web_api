
const express = require("express")

const app = express()

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

app.listen(
    8080,
    ()=>{
        console.log("server started")
    }
)


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

const blogs = [
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







