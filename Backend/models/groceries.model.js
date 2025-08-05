const mongoose = require('mongoose')

const grocerySchema = new mongoose.Schema({
    household:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HouseHold'
    }, 
    itemName:{
        type:String,
        required:true,
        minlength:[3,'Grocery name should be atleast of 3 letters.']
    },
    quantity:{
        type:String,
        required:true
    },
    bought:{
        type:Boolean,
        default:false,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const groceryModel = mongoose.model('Grocery',grocerySchema)

module.exports = groceryModel;