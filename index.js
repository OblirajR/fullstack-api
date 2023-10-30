const express = require('express')
const mongoose = require('mongoose')
const app= express()
const bodyParser = require("body-parser")
const userRouter = require('./routers/user.routers')
const cors=require("cors")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello asdgfjdgfdhi")
})
app.use("/",userRouter)

mongoose.connect("mongodb+srv://obliraj700:admin124@cluster0.lvnsez8.mongodb.net/registration?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Database connected successfully"))
.catch((err)=>console.log(err))

app.listen(5001,()=>{
    console.log("Server is running on port no 5001")
})