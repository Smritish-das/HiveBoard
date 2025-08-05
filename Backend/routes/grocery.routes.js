const express = require('express')
const { authUser, isMember } = require('../middleware/auth.middleware')
const router = express.Router()
const groceryController = require('../controllers/grocery.controller')
const { body } = require('express-validator')

router.get('/:id',authUser, isMember, groceryController.view )

router.post('/:id',[
    body('itemName').isLength({min:3}).withMessage("Grocery name too short!"),
    body('quantity').isNumeric().withMessage('Please provide a valid quantity!')
],authUser,isMember, groceryController.create)

router.put('/:id/:groceryId',[
    body('itemName').isLength({min:3}).withMessage("Grocery name too short!"),
    body('quantity').isNumeric().withMessage('Please provide a valid quantity!')
],authUser,isMember, groceryController.edit)

router.patch('/:id/:groceryId',[
    body('bought').isBoolean().withMessage("Please provide a valid input!")
],authUser,isMember, groceryController.bought)

router.delete('/:id/:groceryId',authUser,isMember, groceryController.delete)


module.exports = router


