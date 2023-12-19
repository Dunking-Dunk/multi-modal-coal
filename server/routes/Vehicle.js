import express from 'express'
import { authenticatedUser } from '../middleware/Auth.js'

import Vehicle from '../models/Vehicle.js'
import Place from '../models/Place.js'
import User from '../models/User.js'
import ErrorThrower from '../utils/Error.js'

const router = express.Router()

router.get('/stats', authenticatedUser, async(req,res)=> {
    const totalVehicle = await Vehicle.countDocuments()
    const totalTruck = await Vehicle.countDocuments({type: 'truck'})
    const totalTrain = await Vehicle.countDocuments({type: 'train'})
    const totalShip = await Vehicle.countDocuments({type: 'ship'})
    const activeVehicles = await Vehicle.countDocuments({active: true})
    const activeTruck = await Vehicle.countDocuments({active: true, type: 'truck'})
    const activeTrain = await Vehicle.countDocuments({active: true, type: 'train'})
    const activeShip = await Vehicle.countDocuments({active: true, type: 'ship'})
    const healthStatusVehicle = await Vehicle.countDocuments({status: true})
    
    const shipmentVehicles = await Vehicle.countDocuments({shippingStatus: true}) 
    const totalVehiclesCapacity = await Vehicle.aggregate([
        {
          $group: {
            _id: null,
            total: {$sum: "$capacity"},
          },
        },
      ]);

      res.status(200).json({
        totalVehicle,
        totalTruck,
        totalTrain,
        totalShip,
        activeVehicles,
        activeTruck,
        activeTrain,
        activeShip,
        shipmentVehicles,
        totalVehiclesCapacity,
      })
})

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

router.get('/driver/:id',authenticatedUser, async(req, res, next) => {
    const vehicle = await Vehicle.findOne({ driver: req.params.id }).populate('tracker')
       console.log(vehicle)
    if (!vehicle)
        return next(new ErrorThrower('No Vehicle found'))

    res.status(200).json({
        success: true,
        vehicle
    })
})


export default router