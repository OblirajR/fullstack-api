const express = require("express")
const router = express.Router()
const {Users} = require("../models/user.models")
const bcrypt = require("bcrypt")

router.post("/signup",async(req,res)=>{
    const {fname,lname,email,password}=req.body
    try{
        let user1 = await Users.findOne({email})
        if(!fname){
            return res.status(400).json("Please enter first name")
        }
        if(!lname){
            return res.status(400).json("Please enter last name")
        }
        if(!email){
            return res.status(400).json("Please enter Email")
        }
        if(!password){
            return res.status(400).json("Please enter a Password")
        }
        if(user1){
            return res.status(400).json("User already exists")
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const user = new Users({fname,lname,email,password:hashedpassword})
        const result=await user.save()
        return res.status(200).json({message:"User registered successfully",userid:result._id})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Error during signup"})
    }
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await Users.findOne({email})
        if(!email){
            return res.status(400).json("Enter a valid Email")
        }
        if(!user){
            return res.status(400).json("Email doesn't exist - Enter a regitered Email or Please Signup")
        }
        if(await bcrypt.compare(password,user.password)){
            return res.status(200).json({message:"Login Successful",result:user})
        }

        return res.status(400).json("Incorrect Password")
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Error during Login"})
    }
})

module.exports = router