const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const { authUser,isMember, isAdmin } = require('../middleware/auth.middleware');
const houseHoldController = require('../controllers/houseHold.controller')


router.post('/create',authUser,[
    body('name').isLength({min:3}).withMessage('Household name should me minimum 3 letters')
],houseHoldController.create)


router.post('/join',authUser,[
    body('inviteCode').isLength({min:6,max:6}).withMessage('Please provide a valid code.')
],houseHoldController.join)


router.get('/:id',authUser,isMember,houseHoldController.view)

router.post('/leave/:id',authUser,isMember,houseHoldController.leave)

router.post('/delete/:id',authUser,isMember,isAdmin,houseHoldController.delete)

module.exports = router