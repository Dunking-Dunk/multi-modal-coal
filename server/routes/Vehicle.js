import express from 'express'
import { authenticatedUser } from '../middleware/Auth.js'

import Vehicle from '../models/Vehicle.js'
import Place from '../models/Place.js'
import User from '../models/User.js'
import ErrorThrower from '../utils/Error.js'

const router = express.Router()

//get vehicles
router.get('/', authenticatedUser,async (req, res) => {
    const {vehicle} = req.query

    let vehicles;

    if (!vehicle) {
        vehicles = await Vehicle.find({})
    } else {
        vehicles = await Vehicle.find({mode: vehicle})
    }

    res.status(200).json({
        success: true,
        vehicles
    })
})

router.post('/', authenticatedUser, async (req, res) => {
    const vehicle = await Vehicle.create(req.body)

    if (vehicle.driver) {
        await  User.findByIdAndUpdate(vehicle.driver, { vehicle: vehicle._id  })
    }
  
    if (vehicle.housingOrigin) {
        await Place.findByIdAndUpdate(vehicle.housingOrigin, {  $push: { vehicleHousing: vehicle._id } })
    }
 
    res.status(200).json({
        success: true,
        vehicle
    })
})
//get one vehicle

router.get('/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
    const vehicle = await Vehicle.findById(id).populate('driver').populate('tracker')

    res.status(200).json({
        success: true,
        vehicle
    })
})

//update vehicle 
router.put('/:id', authenticatedUser,async (req, res) => {
    const { id } = req.params

    const vehicle = await Vehicle.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true, runValidators: true })

    if (vehicle.driver) {
        await  User.findByIdAndUpdate(vehicle.driver, { vehicle: vehicle._id  })
    }
  

    res.status(200).json({
        success: true,
        vehicle
    })
})

//update delete
router.delete('/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
    const vehicle = await Vehicle.findById(id)

    if (vehicle.driver) {
        await User.findByIdAndUpdate(vehicle.driver, {
            $unset: { vehicle: ''}
        })
    }


     await Vehicle.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        id
    })
})

router.get('/driver/:id', authenticatedUser, async (req, res,next) => {
    const vehicle = await Vehicle.find({ driver: req.params.id })
        console.log(req.params.id)
        
    if (!vehicle)
        return next(new ErrorThrower('No Vehicle found'))

    res.status(200).json({
        success: true,
        vehicle
    })
})

export default router