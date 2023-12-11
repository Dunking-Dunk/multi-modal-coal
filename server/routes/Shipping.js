import express from 'express'
import { Shipping, SubShipping } from '../models/Shipping'
import Vehicle from '../models/Vehicle'
import Place from '../models/Place'

const router = express.Router()

router.get('/', async(req,res) => {
    const shipments = await Shipping.find({})

    res.status(200).json({
        success: true,
        shipments
    })
})

router.post('/', async (req, res) => { 
    const { quantity, origin, destination, startDate, eta, subShipments } = req.body

    const subShipping = []

    await subShipments.map(async (shipment) => {
        const s = await SubShipping.create(shipment)
        await s.vehicles.map(async (vehicle) => { 
            await Vehicle.findByIdAndUpdate(vehicle, {
                shipment: s._id
            })
        })
        await Place.findByIdAndUpdate(origin.place, {
            $push: {
                shipments: s._id
            }
        })
        if (destination.place)
            await Place.findByIdAndUpdate(destination.place, {
            $push: {
                shipments: s._id
            }
            })
        subShipping.push(s)
    })

    
    const shipment = await Shipping.create({
        origin,
        destination,
        quantity,
        startDate,
        deadline,
        eta,
        subShipping
    })

    res.status(200).json({
        success: true,
        shipment
    })
})

router.get('/:id', async(req,res) => {
    const shipment = await Shipping.findById(req.params)

    res.status(200).json({
        success: true,
        shipment
    })
})



export default router