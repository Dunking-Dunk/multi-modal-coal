import express from 'express'
import { authenticatedUser } from '../middleware/Auth.js'
import Place from '../models/Place.js'

const router = express.Router()

//get places
router.get('/', authenticatedUser,async (req, res) => {
    const {type} = req.query

    let places;

    if (!type) {
        places = await Place.find({}).populate('supervisor')
    } else {
        places = await Place.find({ type})
    }

    res.status(200).json({
        success: true,
        places
    })
})

router.post('/',authenticatedUser, async (req, res) => {
    const place = await Place.create(req.body)

    res.status(200).json({
        success: true,
        place
    })
})

//get  place
router.get('/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
    const place = await Place.findById(id).populate('supervisor')

    res.status(200).json({
        success: true,
        place
    })
})

//update vehicle 
router.put('/:id', authenticatedUser,async (req, res) => {
    const { id } = req.params
    
    const place = await Place.findByIdAndUpdate(id, {
        ...req.body
    })

    res.status(200).json({
        success: true,
        place
    })
})

//update delete
router.delete('/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
     await Place.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        id
    })
})


export default router