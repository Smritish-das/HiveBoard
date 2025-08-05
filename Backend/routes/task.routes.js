const express = require('express')
const { authUser, isMember } = require('../middleware/auth.middleware')
const router = express.Router()
const taskController = require('../controllers/task.controller')
const { body } = require('express-validator')

router.get('/:id',authUser, isMember, taskController.view )


router.post('/:id',[
    body('title').isLength({min:3}).withMessage("Task name should be atleast of 3 character"),
    body('dueDate').custom(value => !isNaN(Date.parse(value))).withMessage('Please provide a valid date')
],authUser,isMember, taskController.create)


router.put('/:id/:taskId',[
    body('title').isLength({min:3}).withMessage("Task name should be atleast of 3 character"),
    body('dueDate').custom(value => !isNaN(Date.parse(value))).withMessage('Please provide a valid date')
],authUser,isMember, taskController.edit)


router.patch('/:id/:taskId',[
    body('status').isIn(['todo', 'inProgress', 'done']).withMessage("Please provide a valid status"),
    body('position').isNumeric().withMessage('Please provide a valid position')
],authUser,isMember, taskController.changePosition)


router.delete('/:id/:taskId',authUser,isMember, taskController.deleteTask)

module.exports = router