const houseHoldModel = require('../models/houseHolds.models')
const crypto = require('crypto')
module.exports.generateInviteCode = async (length = 6) => {
    let code,exists;
    do{
        code = crypto.randomBytes(length).toString('base64url').slice(0, length);
        exists = await houseHoldModel.findOne({inviteCode:code})
    }while(exists)

    return code;
}

module.exports.create = async({
    name,
    inviteCode,
    owner
}) => {
    if(!name ){
        throw new Error("Please provide a name");
    }

    const houseHold = await houseHoldModel.create({
        name,
        inviteCode,
        members:[owner],
        admin:owner
    })

    return houseHold;
}



