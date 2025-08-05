const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes.controller')
const { body } = require('express-validator')
const { authUser, isMember } = require('../middleware/auth.middleware')


router.get('/:id',authUser,isMember,notesController.view)

router.post('/:id',[
    body('content').isLength({min:5}).withMessage('Content not long enough!')
],authUser,isMember,notesController.create)

router.put('/:id/:noteId',[
    body('content').isLength({min:5}).withMessage('Content not long enough!')
],authUser,isMember,notesController.edit)

router.patch('/:id/:noteId',authUser,isMember,notesController.changePin)

router.delete('/:id/:noteId',authUser,isMember,notesController.delete)





module.exports = router