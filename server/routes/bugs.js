const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");
const auth = require('../middlewares/auth');
const Bug = require("../models/Bug");

router.post("/",auth ,async (req, res) => {
    try{
        if(req.user.role !== 'Tester'){
            return res.status(403).json({msg : "Forbidden: Only testers can create bugs"})
        }
        const { title, description, priority, projectId } = req.body;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        const newBug = new Bug({
            title,
            description,
            priority,
            project: projectId,
            createdBy: req.user.id
        });
    
        const bug = await newBug.save();
        res.status(201).json(bug);
    }catch(error){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/:projectId', auth, async (req, res) => {
  try {
    const bugs = await Bug.find({ project: req.params.projectId })
      .populate('createdBy', ['username'])
      .populate('assignee', ['username']);
    
    if (!bugs) {
      return res.status(404).json({ msg: 'Bugs not found for this project' });
    }
    
    res.json(bugs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put("/:bugId/status", auth, async (req, res) => {
  try{
    const {status} = req.body;
    const bug = await Bug.findById(req.params.bugId);
     
    if(!bug){
      return res.status(403).json({msg : "Bug Not Found"});
    }

    if(req.user.role !== "Developer"){
      return res.status(403).json({ msg: 'Forbidden: Only developers can update bug status' });
    }

    if (bug.assignee && bug.assignee.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Forbidden: You are not assigned to this bug' });
    }
    bug.status = status;
    await bug.save();

    res.json(bug);
  }catch(error){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put("/:bug/verify", auth, async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.bug);
    
    if (!bug) {
      return res.status(404).json({ msg: 'Bug not found' });
    }

    if (req.user.role !== 'Tester') {
      return res.status(403).json({ msg: 'Forbidden: Only testers can verify bugs' });
    }

    if (status !== 'Closed' && status !== 'Reopened') {
      return res.status(400).json({ msg: "Invalid status. Status can only be 'Closed' or 'Reopened'." });
    }

     bug.status = status;
    await bug.save();

    res.json(bug);

    res.json(bug);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

router.get("/:bugId", auth, async (req, res) => {
  try{
    const bug = await Bug.findById(req.params.bugId)
    .populate('createdBy', ['username','email','role'])
    .populate('assignee',['username','email','role'])
    .populate('project', ['name'])

    if(!bug){
      return res.status(404).json({msg :'Bug not found!'});

    }

    res.json(bug);
  }catch(error){
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Bug not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.get("/:projectId", auth, async(req, res) => {
  try{
    const project = await Project.findById(req.params.projectId)
    .populate('owner',['username', 'email'])
    .populate('members.user', ['username', 'email', 'role'])

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.json(project);
  }catch(error){
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Project not found' });
      }
      res.status(500).send('Server Error');

  }
});

router.put("/:bugId/assign", auth, async (req, res) => {
    try {
    const { assigneeId } = req.body;
    let bug = await Bug.findById(req.params.bugId);

    if (!bug) {
      return res.status(404).json({ msg: 'Bug not found' });
    }

   
    if (req.user.role !== 'Tester') {
      return res.status(403).json({ msg: 'Forbidden: Only testers can assign bugs' });
    }
    
    bug.assignee = assigneeId;
    await bug.save();

    res.json(bug);

  }catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Bug or assignee not found' });
    }
    res.status(500).send('Server Error');
  }
})

module.exports = router;