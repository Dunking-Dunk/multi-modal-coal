import express from 'express'
import { authenticatedUser } from '../middleware/Auth.js'

import Place from '../models/Place.js'
import User from '../models/User.js'

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

    if (place.supervisor) {
        await User.findByIdAndUpdate(place.supervisor, { supervisor: place._id  })
    }

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

    if (place.supervisor) {
        await User.findByIdAndUpdate(place.supervisor, { supervisor: place._id  })
    }

    res.status(200).json({
        success: true,
        place
    })
})

//update delete
router.delete('/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
    const place = await Place.findById(id)
    
    if (place.supervisor) {
        await User.findByIdAndUpdate(place.supervisor, {
            $unset: {supervisor: ''}
        })
    }

    await Place.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        id
    })
})

router.get('/supervisor/:id', authenticatedUser, async (req, res, next) => {
    const place = await Place.findOne({ supervisor: req.params.id })
    
    if (!place)
        return next(new ErrorThrower('No Place found'))

    res.status(200).json({
        success: true,
        place
    })
})


export default router