import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({ 
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
        enum: ['truck', 'wagon', 'ship'],
        required: [true, 'Vehicle Mode Number Required'],
    },
    status: {
        type: Boolean
    },
    shipping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping'
    },
    shippingStatus: {
        type: Boolean
    },
    //this is the id that is present in respective vehicle tcu
    trackerId: {
        type: String,
        required: true,
        unique: true
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
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