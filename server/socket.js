import { io } from "./index.js"

import { haversineformula } from "./utils/distanceBetweenCoords.js"
import Logs from "./models/Log.js"
import Tracker from './models/Tracker.js'
import Vehicle from "./models/Vehicle.js"
import { Shipping, SubShipping } from "./models/Shipping.js"

async function checkVehiclePlaceIntersection(subShipments, vehicle) {
    for (const shipment of subShipments) { 
        const [lon1, lat1] = shipment.destination.location.coordinate
        const [lon3,lat3] = shipment.origin.location.coordinate
        const [lon2, lat2] = vehicle[0].location?.coordinate
        const destinationDistance = haversineformula(lat1, lat2, lon1, lon2)
        const originDistance = haversineformula(lat2,lat3,lon2,lon3)
        if (destinationDistance < 1 && shipment.status === 'dispatched') {
            await SubShipping.findByIdAndUpdate(shipment._id, {
               status: 'completed'
            })
            await Logs.create({
                message: `vehicle ${vehicle[0].registerNumber} reached destination ${shipment.destination.place.name}`,
                reference: [
                    {
                        id: shipment.shipment,
                        ref: 'shipping'
                    }, 
                    {
                        id: vehicle[0]._id,
                        ref: 'vehicle'
                    },
                    {
                        id: shipment._id,
                        ref: 'subshipping'
                    }
                ]
            })
            if (shipment.status === 'completed') { 
                const mainShipment = await Shipping.findById(String(shipment.shipment)).populate('subShipping')
                if (mainShipment.subShipping[mainShipment.subShipping.length - 1].status === 'completed' && mainShipment.status !== 'completed') {
                    mainShipment.set({
                        status: 'completed',
                        quantity: 2000
                    })
                    await mainShipment.save()
                    await Logs.create({
                        message: `Shipment is completed`,
                        reference: [
                            {
                                id: shipment.shipment,
                                ref: 'shipping'
                            },
                        ]
                    })
                }
            }   
        }
  
        if (originDistance > 1 && shipment.status === 'processing') {
            await SubShipping.findByIdAndUpdate(shipment._id, {
                status: 'dispatched'
            })

            await Logs.create({
                message: `vehicle ${vehicle[0].registerNumber} has left from ${shipment.origin.place.name}`,
                reference: [
                    {
                        id: shipment.shipment,
                        ref: 'shipping'
                    }, 
                    {
                        id: vehicle[0]._id,
                        ref: 'vehicle'
                    },
                    {
                        id: shipment._id,
                        ref: 'subshipping'
                    }
                ]
            })
        }
    }
}

export const connection = () => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} a user connected`)
     

        socket.on('join-room', (room) => {
            socket.join(room)
        })

        socket.on('leave-room', (room) => {
            socket.leave(room)
        })

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`)
        })
    })

    const watchOptions = {
        fullDocument: 'updateLookup'
    }
    
    const changeStreamTracker = Tracker.collection.watch([], watchOptions)
    const changeStreamVehicle= Vehicle.collection.watch([], watchOptions)
    const changeStreamLog = Logs.collection.watch([], watchOptions)
    const changeStreamSubShipping = SubShipping.collection.watch([], watchOptions)
    const changeStreamShipping = Shipping.collection.watch([], watchOptions)
    
    changeStreamTracker.on('change', async(data) => {
        const fullDocument = data.fullDocument
    
        if (data.operationType === 'insert') {
            const id = String(fullDocument.trackerId)
            io.to(id).emit("getVehicleLocation", { ...fullDocument});
        }
        const vehicle = await Vehicle.find({ trackerId: fullDocument?.trackerId })
       
        const subShipping = await SubShipping.find({ vehicles: { $in: vehicle[0]._id } }).populate('origin.place').populate('destination.place')
        checkVehiclePlaceIntersection(subShipping, vehicle)
    })

    changeStreamVehicle.on('change',async (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'update') {
            io.to('allVehicles').emit('getAllVehicleLocation', fullDocument)
        }
    })

    changeStreamLog.on('change',async (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'insert') {
            io.to('log').emit('getLog', fullDocument)
            for (const ref of fullDocument.reference) {
                io.to(ref.id).emit('getLog', fullDocument)
            }
        }
    })

    changeStreamSubShipping.on('change',async (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'update') {
            const shipment = await Shipping.findById(fullDocument.shipment).populate('subShipping').populate({
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
                }
            })
            io.to(String(fullDocument.shipment)).emit('getShipment', shipment)
        }
    })

    changeStreamShipping.on('change',async (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'update') {
            const shipment = await Shipping.findById(fullDocument._id).populate('subShipping').populate({
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
                }
            })
            io.to(String(shipment._id)).emit('getShipment', shipment)
        }
    })
}

