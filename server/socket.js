import { io } from "./index.js"

import Tracker from './models/Tracker.js'
import Vehicle from "./models/Vehicle.js"

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
    // const changeStreamStop = Stop.collection.watch([], watchOptions)
    // const changeStreamDriver = Driver.collection.watch([], watchOptions)
    changeStreamTracker.on('change', (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'insert') {
            const id = String(fullDocument.trackerId)
            io.to(id).emit("getVehicleLocation", { ...fullDocument});
        }
    })

    changeStreamVehicle.on('change',async (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'update') {
            const Vehicles = await Vehicle.find({})
            io.to('allVehicles').emit('getAllVehicleLocation', Vehicles)
            if (fullDocument.type) {
                const typeVehicles = await Vehicle.find({ type: fullDocument.type })
             
                io.to(fullDocument.type).emit('getAllVehicleLocation',typeVehicles)
            }
        }
    })
    // changeStreamStop.on('change', (data: any) => {
    //     const fullDocument = data.fullDocument
    //     if (data.operationType === 'update') {
    //         io.emit('updateStop', { ...fullDocument, id: fullDocument._id })
    //     }
    // })

    // changeStreamDriver.on('change', (data: any) => {
    //     const fullDocument = data.fullDocument
    //     if (data.operationType === 'update') {
    //         io.emit('updateDriver', { ...fullDocument, id: fullDocument._id })
    //     }
    // })


}