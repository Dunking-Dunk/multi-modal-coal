import mongoose from 'mongoose';


const trackerSchema = mongoose.Schema({
    speed: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinate: {
            type: [Number],
            required: true
        },
    },
    //all tcu data comes here
    gpsId: {
        type: String,
        required: true,
        unique: true
    }//gpsId is registered on the tcu soo it should be consitent
    
})

const Tracker = mongoose.model('Tracker', trackerSchema)

export default Vehicle