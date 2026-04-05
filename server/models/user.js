const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide a name"],
        trim:true,
        maxlength:[20,"name can't be more than 20 characters"]
    },
    email: {
        type: String,
        required: [true, "must provide an email"],
        maxlength: [30, "email can't be more than 20 characters"],
        match: [/^\S+@\S+\.\S+$/, "please provide a valid email"],
        unique:true
    },
    password:{
        type:String,
        required: [true, "must provide a password"],
        minlength: [6, "password must be at least 6 characters"],
        maxlength:[128]
    }
})
module.exports= mongoose.model('User',userSchema)