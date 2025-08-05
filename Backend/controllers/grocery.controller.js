const groceryModel = require('../models/groceries.model')
const groceryService = require('../services/groceries.service')
const { validationResult } = require('express-validator')

module.exports.view = async(req,res,next) => {
    const household_id = req.params.id;
    const groceries = await groceryModel.find({household:household_id});
    res.status(200).json(groceries);
}

module.exports.create = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { itemName, quantity } = req.body;
    const household = req.household;
    const user = req.user;

    const groceryAlreadyExists = await groceryModel.findOne({itemName,household:household._id});

    if(groceryAlreadyExists){
        return res.status(400).json({message:'Grocery already exists'});
    }

    const grocery = await groceryService.createGrocery({
        itemName,
        quantity,
        user: user._id,
        household:household._id
    });



    res.status(200).json(grocery);
}

module.exports.edit = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { itemName, quantity } = req.body;
    const household = req.household;
    const groceryId = req.params.groceryId

    const groceryAlreadyExists = await groceryModel.findOne({_id:groceryId,household:household._id});


    if(!groceryAlreadyExists){
        return res.status(400).json({message:'No grocery found!'});
    }

    const item = await groceryService.edit({
        itemName,
        quantity,
        grocery:groceryId,
        household:household._id
    });

    res.status(200).json(item);
}

module.exports.bought = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { bought } = req.body;
    const household = req.household;
    const groceryId = req.params.groceryId

    const groceryAlreadyExists = await groceryModel.findOne({_id:groceryId,household:household._id});


    if(!groceryAlreadyExists){
        return res.status(400).json({message:'No grocery found!'});
    }

    const item = await groceryModel.findByIdAndUpdate(groceryId,
        {
            bought:bought
        },
        {
            new : true
        }
    )

    res.status(200).json(item);
}

module.exports.delete = async(req,res,next) => {

    const household = req.household;
    const groceryId = req.params.groceryId

    const groceryAlreadyExists = await groceryModel.findOne({_id:groceryId,household:household._id});

    if(!groceryAlreadyExists){
        return res.status(400).json({message:'Grocery does not exists'});
    }

    const grocery = await groceryService.deleteGrocery({ 
        id: groceryId,
        household:household._id
    });


    res.status(200).json({message:'Deleted successfully!'});
}