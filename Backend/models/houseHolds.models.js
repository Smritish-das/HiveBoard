const mongoose = require("mongoose");

const houseHoldSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,'Household name should be at least 3 characters ']
    },
    inviteCode:{
        type:String,
        required: true,
        unique:true
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    taskscount:{
        type:Number,
        default:0
    },
    notescount:{
        type:Number,
        default:0
    },
    groceriescount:{
        type:Number,
        default:0
    }
},{timestamps:true});

const houseHoldModel = mongoose.model('HouseHold',houseHoldSchema)

module.exports = houseHoldModel;;