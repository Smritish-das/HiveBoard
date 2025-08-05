const { validationResult } = require('express-validator');
const houseHoldModel = require('../models/houseHolds.models')
const houseHoldService = require('../services/houseHold.service');
const taskModel = require('../models/tasks.model');
const userModel = require('../models/user.models');


module.exports.create = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { name } = req.body;

    const inviteCode = await houseHoldService.generateInviteCode();

    const houseHold = await houseHoldService.create({
        name,
        inviteCode,
        owner:req.user._id
    });

    await userModel.findOneAndUpdate({_id:req.user._id},{$push: { houseHoldIds: houseHold._id }})

    return res.status(201).json({houseHold});
}

module.exports.join = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { inviteCode } = req.body;

    const houseHold = await houseHoldModel.findOne({
        inviteCode
    })
    
    if(!houseHold){
        return res.status(403).json({message:'Household doesnt exists'})
    }


    const alreadyExists = houseHold.members?.some(id => id.equals(req.user._id))

    if(alreadyExists){
        return res.status(400).json({message:"Already a member."});
    }

    houseHold.members.push(req.user._id);

    await houseHold.save();

    res.status(201).json({message:"Join successfully",houseHold});
}

module.exports.view = async(req,res,next) => {
    const id = req.params.id;
    const household = req.household;

    return res.status(200).json(household);
}

module.exports.leave = async(req,res,next) => {
    const user = req.user;
    const id = req.params.id;
    const household = await houseHoldModel.findOne({_id:id});

    await userModel.findOneAndUpdate({_id:user._id},{ $pull: { houseHoldIds: id } },)

    household.members = household.members.filter(member => !member._id.equals(user._id));
    
    

    if(household.members.length === 0){
        await taskModel.deleteMany({household:id})
        const deleted = await houseHoldModel.findOneAndDelete({_id:household._id});
        if(deleted){
            await taskModel.deleteMany({household:deleted._id})
        }
    }

    else if(household.admin.equals(user._id)){
        const newAdmin = household.members[Math.floor(Math.random() * household.members.length)];
        if(newAdmin){
            household.admin = newAdmin;
        }
        await household.save();
    }
    

    return res.status(201).json({message:"Left household!"});
}

module.exports.delete = async(req,res,next) => {
    const user = req.user;
    const id = req.params.id;
    const household = req.household;

    await taskModel.deleteMany({household:id})

    household.members.forEach(async(member)  => {
       await userModel.findOneAndUpdate({_id:member},{ $pull : {houseHoldIds: id} })
    });

    const deleted  = await houseHoldModel.findOneAndDelete({_id:id});
    
    return res.status(201).json({message:"Deleted household!"});
}


