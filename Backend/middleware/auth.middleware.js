const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')
const houseHoldModel = require('../models/houseHolds.models')
const blacklistTokenModel = require('../models/blacklistToken.model')


module.exports.authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    const blacklistToken = await blacklistTokenModel.findOne({token})
    
    if(blacklistToken){
        return res.status(401).json({message:Unauthorized});
    }
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({_id:decoded._id});

        req.user = user;
        next();
    }catch(err){

        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports.isMember = async (req,res,next) => {
    const user = req.user;
    const id = req.params.id;

    try{
        const household = await houseHoldModel.findById(id);
        if(!household){
            return res.status(400).json({message:'Household doesnt exists'})
        }
        const isMember = household.members.some(id => id.equals(user._id))
        if(!isMember){
            return res.status(401).json({message:"Unauthorized"})
        }

        req.household = household;
        next();
    }catch(err){
        console.log(err)
        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports.isAdmin = async (req,res,next) => {
    const user = req.user;
    const id = req.params.id;
    const household = req.household;
    
    try{
        const isAdmin = household.admin.equals(user._id)
        if(!isAdmin){
            return res.status(401).json({message:"Unauthorized1"})
        }
        next();
    }catch(err){
        return res.status(401).json({message: 'Unauthorized2'})
    }
}