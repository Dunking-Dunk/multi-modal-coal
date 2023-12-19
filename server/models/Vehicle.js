import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({ 
    make: {
        type: String,
        required: [true, 'Vehicle Make Required'],
    },
    model: {
            type: String,
            required: [true, 'Vehicle Model Required'],
    },
    registerNumber: {
        type: String,
        required: [true, 'Vehicle Registeration Number Required'],
        unique: true
    },
    capacity: {
        type: Number,
        required: [true, 'Vehicle Capacity Required']
    },
    type: {
        type: String,
        enum: ['truck', 'train', 'ship'],
        required: [true, 'Vehicle Mode Number Required'],
    },
    active: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    shipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubShipping'
    }],
    shippingStatus: {
        type: Boolean,
        default: false
    },
    //this is the id that is present in respective vehicle tcu with base details
    trackerId: {
        type: String,
        required: true,
        unique: true
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
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
            default: [0,0]
        },
    },
    //
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    housingOrigin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle