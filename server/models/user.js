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
        unique:true
    },
    password:{
        type:String,
        required: [true, "must provide a password"],
        maxlength:[128]
    }
})
module.exports= mongoose.model('User',userSchema)