const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Project = require("../models/Projects");


router.post("/", async (req, res) =>{
    try{
        if(req.user.role !== "Admin" && req.user.role !== "Tester"){
            return res.status(403).json({msg : "Forbidden: You do not have permission to create a project"});
        }

        const {name, description} = req.body;
        let existingProject = await Project.findOne({name});
        if(existingProject){
            return res.status(400).json({error: "Project already exists"});
        }
        const newProject = new Project({
            name,
            description,
            owner : req.user.id,
            memebers : [{user : req.user.id, role : req.user.role}]
        })
        const project = await newProject.save();
        res.status(201).json(project);
    }catch (error){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', ['username', 'email']);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;