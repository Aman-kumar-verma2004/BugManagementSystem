const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    description :{
        type: String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['Admin', 'Tester', 'Developer'],
        default: 'Tester'
      }
    }
  ]
})

module.exports = mongoose.model('Project', projectSchema);