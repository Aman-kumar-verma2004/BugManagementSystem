const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//Register Route
router.post("/register",async (req,res) => {
    try{
        const {username, email, password, role} = req.body;
        let existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({error :"User Already Exists"});
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPass =await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password:hashedPass, role});
        await newUser.save();
        res.status(201).json({message :" User created Successfully"});
        
    }catch(error){
        res.status(500).json({error : "Internal Server Error"})
    }
})

//Login Route
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        let existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(400).json({error : "User not found"});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).json({error : "Invalid Credentials"});
        }
        const payload = {
            user : {
                id : User.id,
                role : User.role
            }
        };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn :"1h"}, (err, token)=>{
            if(err) throw err;
            res.json({token})
        })

        res.status(200).json({message : "Login Successful", user: existingUser});
    }catch(error){
        res.status(500).json({error : "Internal Server Error"});
    }
});

//Updating the role only by the Admin
router.put("/update-role/:userId", auth, async (req, res) => {
    try{
        const {role} = req.body;
        let user = await User.findById(req.params.userId);

        if(!user){
            return res.status(404).json({error : 'User Not Found'});
        }

        if(req.user.role !== "Admin"){
            return res.status(403).json({msg :"Forbidden : Only Admin can update user Roles"});
        }

        user.role = role;
        await user.save();

    }catch(err){
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send("Server error");
    }
})

module.exports = router;