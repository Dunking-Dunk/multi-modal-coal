import express from 'express'
import { Shipping, SubShipping } from '../models/Shipping.js'
import Vehicle from '../models/Vehicle.js'
import Place from '../models/Place.js'
import Log from  '../models/Log.js'

const router = express.Router()

router.get('/', async(req,res) => {
    const shipments = await Shipping.find({}).populate('origin.place').populate('destination.place')

    res.status(200).json({
        success: true,
        shipments
    })
})

router.post('/', async (req, res) => { 
    const { quantity, origin, destination, startDate, eta, subShipments,status } = req.body

    const shipment = await Shipping.create({
        origin,
        destination,
        quantity,
        startDate,
        eta,
        status
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
            // await Log.create({
            //     message: `Shipment Assigned to Vehicle with id ${vehicle}`,
            //     title: 'Shipment',
            //     reference: [shipment._id,s._id, vehicle]
            // })
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

        // await Log.create({
        //     message: `Shipment Assigned to places`,
        //     title: 'Shipment',
        //     reference: [shipment._id, s._id,origin.place,destination.place]
        // })
       
         subShipping.push(s._id)
    }

     await Shipping.findOneAndUpdate({ _id: shipment._id }, {
        subShipping: subShipping
     })
    
    await Log.create({
        message: `Shipment created`,
        reference: [shipment._id]
    })
    
    const finalShipment = await Shipping.findById(shipment._id).populate('origin.place').populate('destination.place')
   
    res.status(200).json({
        success: true,
        shipment:finalShipment
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
        const sub = await SubShipping.findById(shipment)
        await Place.findByIdAndUpdate(sub.origin.place, { $pull: sub._id })
        await Place.findByIdAndUpdate(sub.destination.place, { $pull: {shipments: sub._id } })
        for (const vehicle of sub.vehicles) { 
            await Vehicle.findByIdAndUpdate(vehicle, { $pull: {shipments: sub._id } })
        } 
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