import express from 'express'
import {authenticatedUser} from '../middleware/Auth.js'
import Log from '../models/Log.js'

const router = express.Router()



router.post('/',  async (req, res) => {
    const log = await Log.create(req.body)

    res.status(200).json({
        success: true,
        log
    })
})

router.get('/', authenticatedUser, async (req, res) => {
  
    const logs = await Log.find({})
   
    res.status(200).json({
        success: true,
        logs
    })
})


router.get('/all/:id', authenticatedUser, async (req, res) => {
    const { id } = req.params

    const logs = await Log.find({ reference: { $elemMatch: { id: id } }}).sort({createdAt: -1})
    
    res.status(200).json({
        success: true,
        logs
    })
})


export default router