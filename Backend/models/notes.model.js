const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    household:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HouseHold'
    },
    content:{
        type:String,
        minlength:[5,'Note length should be atleast 5 letters.'], 
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    pin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const noteModel = mongoose.model('Note',noteSchema)

module.exports = noteModel;