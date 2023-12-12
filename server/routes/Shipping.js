import express from 'express'
import { Shipping, SubShipping } from '../models/Shipping.js'
import Vehicle from '../models/Vehicle.js'
import Place from '../models/Place.js'

const router = express.Router()

router.get('/', async(req,res) => {
    const shipments = await Shipping.find({}).populate('origin.place').populate('destination.place')

    res.status(200).json({
        success: true,
        shipments
    })
})

router.post('/', async (req, res) => { 
    const { quantity, origin, destination, startDate, eta, subShipments } = req.body

    const shipment = await Shipping.create({
        origin,
        destination,
        quantity,
        startDate,
    })

    let subShipping = []

    for (const shipmentsub of subShipments) {
        const s = await SubShipping.create({...shipmentsub,shipment: shipment._id })
        await s.vehicles.map(async (vehicle) => { 
            await Vehicle.findByIdAndUpdate(vehicle, {
                $push: {
                    shipments: s._id
                }
            })
        })
        await Place.findByIdAndUpdate(origin.place, {
              $push: {
                    shipments: s._id
                }
        })
        if (destination.place) {
            await Place.findByIdAndUpdate(destination.place, {
                $push: {
                    shipments: s._id
                }
                })
        }
         subShipping.push(s._id)
    }

    shipment.subShipping = subShipping

    res.status(200).json({
        success: true,
        shipment
    })
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const shipment = await Shipping.findById(id).populate('subShipping').populate({
        path: 'subShipping', populate: {
            path: 'vehicles',
            model: 'Vehicle'
        }
    }).populate({
        path: 'subShipping'
        , populate: {
        path: 'origin.place',
        model: 'Place'
        }
    }).populate({
        path: 'subShipping'
        , populate: {
        path: 'destination.place',
        model: 'Place'
    }})

    res.status(200).json({
        success: true,
        shipment
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
  
    const shipping = await Shipping.findById(id)
  
    for (const shipment of shipping.subShipping) { 
        await SubShipping.findByIdAndDelete(shipment)
    }
    
    await Shipping.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        id
    })
})

router.get('/vehicle/:id', async (req, res) => {
    const {id} = req.params
    const shipments = await SubShipping.find({ vehicles: {$in: id} }).populate('origin.place').populate('destination.place')
    
    res.status(200).json({
        success: true,
        shipments
    })
})

router.get('/place/:id', async (req, res) => { 
    const {id} = req.params
    const shipments = await SubShipping.find({ $or: [{'origin.place':  id}, {'destination.place': id}]}).populate('origin.place').populate('destination.place')
    
    res.status(200).json({
        success: true,
        shipments
    })
})

export default router