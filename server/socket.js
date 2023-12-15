import { io } from "./index.js"

import Logs from "./models/Log.js"
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
    const changeStreamLog = Logs.collection.watch([], watchOptions)
    
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
            io.to('allVehicles').emit('getAllVehicleLocation', fullDocument)
            // if (fullDocument.type) {
            //     const typeVehicles = await Vehicle.find({ type: fullDocument.type })
             
            //     io.to(fullDocument.type).emit('getAllVehicleLocation',typeVehicles)
            // }
        }
    })

    changeStreamLog.on('change',async (data) => {
        const fullDocument = data.fullDocument
        if (data.operationType === 'insert') {
            console.log('lol')
            io.to('log').emit('getLog', fullDocument)
            // if (fullDocument.type) {
            //     const typeVehicles = await Vehicle.find({ type: fullDocument.type })
             
            //     io.to(fullDocument.type).emit('getAllVehicleLocation',typeVehicles)
            // }
        }
    })


}