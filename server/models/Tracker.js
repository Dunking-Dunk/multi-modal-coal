import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema({
    speed: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinate: {
            type: [Number],
            required: true,
        },
    },
    //all tcu data comes here
    fuelLevel: {
        type: Number,
        default: 0
    },
    engineStatus: {
        type: Boolean,
        default: false  
    },
    engineRpm: {
        type: Number,
        default: 0
    },
    engineTemp: {
        type: Number,
        default: 0
    },
    torque: {
        type: Number,
        default: 0
    },
    batteryLevel: {
        type: Number,
        default: 0
    },
    batteryVoltage: {
        type: Number,
        default: 0,
    },
    wheelRpm: {
        type: Number,
        default: 0
    },
    co2emission: {
        type: Number,
        default: 0
    },
    coolantTemp: {
        type: Number,
        default: 0
    },
    transmissionTemp: {
        type: Number,
        default: 0
    },
    diagnosticCodes: [{
        type:String   
    }],
    trackerId: {
        type: String,
        required: true,
    },//trackerId is registered on the tcu soo it should be consistent
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Tracker = mongoose.model('Tracker', trackerSchema)

export default Tracker
