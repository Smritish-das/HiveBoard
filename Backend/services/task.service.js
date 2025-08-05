const houseHoldModel = require('../models/houseHolds.models');
const taskModel = require('../models/tasks.model');
const mongoose = require('mongoose')

module.exports.createTask = async ({
    title,
    description,
    dueDate,
    user,
    household
}) => {
    if(!title || !dueDate || !user){
        throw new Error("Please provide all fields");
    }

    const maxTask = await taskModel.findOne({status:'todo'}).sort('-position').exec();
    const position = maxTask ? maxTask.position + 1 : 0

    const task = await taskModel.create({
        title,
        description,
        dueDate,
        position,
        createdBy:user,
        household:household._id
    })

    await houseHoldModel.findOneAndUpdate(
        {
            _id:household,
        },
        {
            $inc:{taskscount: 1}
        }
    )

    return task;

}

module.exports.edit = async ({
    title,
    description,
    dueDate,
    taskId
}) => {
    if(!title || !dueDate || !taskId){
        throw new Error("Please provide all fields");
    }


    const task = await taskModel.findOneAndUpdate({_id:taskId},{
        title,
        description,
        dueDate,
    },{
        new:true
    })

    return task;

}

module.exports.changePosition = async ({
    position,
    status,
    taskId,
    household
}) => {
    if((position < 0) || !taskId || !status || !household){
        console.log(position,status,taskId,household)
        throw new Error('Please provide all fields')
        
    }

    const task = await taskModel.findOne({_id:taskId})
    const taskStatus  = task.status;
    const taskPos = task.position;
    
    const session = await mongoose.startSession()

    try{
        session.startTransaction();

        if(!(taskStatus === status)){
        const maxTask = await taskModel.findOne({status:taskStatus, household}).sort('-position').exec();
        const maxPos = maxTask ? maxTask.position : 1;
        const last = maxPos === taskPos;

        if(!last){
            await taskModel.updateMany(
                {
                    status: taskStatus,
                    household: household,
                    position: { $gt: taskPos, $lte: maxPos }
                },
                {
                    $inc: { position: -1 }
                },{session}
            );        
        }

        const newMaxTask = await taskModel.findOne({status,household}).sort('-position').exec();
        const newMaxPos = newMaxTask ? newMaxTask.position:0;
        const newtask = (newMaxPos + 1) === position;


        if(!newtask){
            await taskModel.updateMany(
                {
                    status: status,
                    household: household,
                    position: { $gte: position, $lte: newMaxPos }
                },
                {
                    $inc: { position: 1 }
                },{session}
            );                
        }

    }else{

        if(position !== taskPos){
            if(taskPos < position){
                await taskModel.updateMany(
                    {
                        status:status,
                        household,
                        position:{ $gt: taskPos, $lte: position }

                    },
                    {
                        $inc:{ position: -1 }    
                    },{session}
                )
                
            }
            else if(taskPos > position){
                await taskModel.updateMany(
                    {
                        status:status,
                        household,
                        position:{ $gte: position , $lt: taskPos }

                    },
                    {
                        $inc:{ position: +1 }    
                    },{session}
                )
            }
             
        } 

    }

        const final = await taskModel.findOneAndUpdate({_id:taskId},{ status, position },{ new: true, session });

        await session.commitTransaction();
        session.endSession();

        return final;
    }
    catch(err){
        await session.abortTransaction()
        session.endSession()
        throw new Error(err);;
    }

}

module.exports.deleteTask = async ({
    taskId,
    household
}) => {
    if(!household || !taskId){
        throw new Error("Please provide all fields");
    }


    const task = await taskModel.findOneAndDelete({_id:taskId});

    await houseHoldModel.findOneAndUpdate(
        {
            _id:household
        },
        {
            $inc:{taskscount: -1}
        }
    )

    return task;

}

