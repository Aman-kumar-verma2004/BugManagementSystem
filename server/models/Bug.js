const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status :{
    type: String,
    enum : ['Open','In Progress', 'Ready for QA', 'Closed', 'Reopened'],
    default : 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Bug', BugSchema);