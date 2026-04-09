const mongoose= require('mongoose')
const habitschema= new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        name:{
            type:String,
            required: [true, "must provide a name"],
            trim: true,
            maxlength: [20, "name can't be more than 20 characters"]
        },
        completed:{
            type:Boolean,
            default:false
        },
        streak:{
            type:Number,
            default:0
        },
        completedDates:{
            type:[Date],
            default:[]
        }

})
module.exports= mongoose.model('Habit',habitschema)