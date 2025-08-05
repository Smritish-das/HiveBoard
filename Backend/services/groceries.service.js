const groceryModel = require('../models/groceries.model')
const houseHoldModel = require('../models/houseHolds.models')


module.exports.createGrocery = async ({
    itemName,
    quantity,
    user,
    household
}) => {
    if(!itemName || !quantity || !user || !household){
        throw new Error("Please provide all fields");
    }

    const grocery = await groceryModel.create({
        itemName,
        quantity,
        createdBy:user,
        household:household._id
    })

    await houseHoldModel.findOneAndUpdate(
        {
            _id:household,
        },
        {
            $inc:{groceriescount: 1}
        }
    )

    return grocery;

}

module.exports.edit = async ({
    itemName,
    quantity,
    grocery,
    household
}) => {
    if(!itemName || !quantity || !grocery || !household){
        throw new Error("Please provide all fields");
    }

    const item = await groceryModel.findOneAndUpdate({_id:grocery},{
        itemName,
        quantity,
    },{
        new:true
    })

    return item;
}

module.exports.deleteGrocery = async ({
    id,
    household
}) => {
    if(!id || !household){
        throw new Error("Please provide all fields");
    }

    const grocery = await groceryModel.deleteOne({
        _id:id
    })

    await houseHoldModel.findOneAndUpdate(
        {
            _id:household,
        },
        {
            $inc:{groceriescount: -1}
        }
    )

    return grocery;

}