const mongoose  = require('mongoose')

const taskSchema = new mongoose.Schema({
    household:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HouseHold'
    },
    title:{
        type:String,
        minlength:[3,'Task name should be at least 3 characters'],
        required:true 
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:['todo','inProgress','done'],
        required:true,
        default:'todo'
    },
    position:{
        type:Number,
    },
    dueDate:{
        type:Date,
        required:true 
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{ timestamps : true})

const taskModel = mongoose.model('Task',taskSchema)

module.exports = taskModel ;