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
    engineRpm: {
        type: Number,
        default: 0
    },
    fuelEfficieny: {
        type: Number,
        default: 0
    },
    exhaustGasTemp: {
        type: Number,
        default: 0
    },
    oxygenLevel: {
        type: Number,
        default: 0
    },
    coolantTemp: {
        type: Number,
        default: 0
    },
    trackerId: {
        type: String,
        required: true,
    },//trackerId is registered on the tcu soo it should be consistent
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Tracker = mongoose.model('Tracker', trackerSchema)

export default Tracker