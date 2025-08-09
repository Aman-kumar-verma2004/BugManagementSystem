const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required: true,
        unique: true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password :{
        type: password,
        required: true,
        
    },
    role:{
        trype: String,
        enum:['Admin','Tester,"Developer'],
        default : "Tester"
    }
})

module.exports = mongoose.model("User", userSchema);