import express from 'express'
import { authenticatedUser } from '../middleware/Auth.js'

import Vehicle from '../models/Vehicle.js'
import Place from '../models/Place.js'

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
    
    const vehicle = await Vehicle.findById(id)

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
    })

    res.status(200).json({
        success: true,
        vehicle
    })
})

//update delete
router.delete('/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
     await Vehicle.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        id
    })
})


export default router