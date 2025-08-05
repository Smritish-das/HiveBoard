const { validationResult } = require('express-validator');
const taskModel = require('../models/tasks.model');
const taskService = require('../services/task.service')

module.exports.view = async(req,res,next) => {
    const household_id = req.params.id;
    const tasks = await taskModel.find({household:household_id}).sort({position: 1});

    const category = {}

    tasks.forEach(task  => {
        const key  = task.status;
        if(!category[key]) category[key] = [];
        category[key].push(task);
    });

    res.status(200).json(category);
}

module.exports.create = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { title, description, dueDate } = req.body;
    const household = req.household;
    const user = req.user;

    const taskAlreadyExists = await taskModel.findOne({title:title,household:household._id});

    if(taskAlreadyExists){
        return res.status(400).json({message:'Task already exists'});
    }

    const task = await taskService.createTask({
        title,
        description,
        dueDate,
        user: user._id,
        household:household._id
    });

    res.status(200).json(task);
}

module.exports.edit = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { title, description, dueDate } = req.body;
    const taskId = req.params.taskId

    const taskAlreadyExists = await taskModel.findOne({_id:taskId});

    if(!taskAlreadyExists){
        return res.status(400).json({message:'Task does not exists'});
    }

    const task = await taskService.edit({
        title,
        description,
        dueDate,
        taskId
    });

    res.status(201).json(task);
}

module.exports.changePosition = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { position, status } = req.body;
    const taskId = req.params.taskId
    const household = req.params.id;

    const taskAlreadyExists = await taskModel.findOne({_id:taskId});

    if(!taskAlreadyExists){
        return res.status(400).json({message:'Task does not exists'});
    }

    const task = await taskService.changePosition({
        position,
        status,
        taskId,
        household
    });

    res.status(200).json(task);
}

module.exports.deleteTask = async(req,res,next) => {
    
    const taskId = req.params.taskId
    const household = req.params.id;

    const taskAlreadyExists = await taskModel.findOne({_id:taskId});

    if(!taskAlreadyExists){
        return res.status(400).json({message:'Task does not exists'});
    }

    const task = await taskService.deleteTask({
        taskId,
        household
    });

    res.status(201).json({message:"Deleted Task successfully!"});
}



