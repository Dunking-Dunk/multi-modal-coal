import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
    bus: {
        type: String,
        required: true,
    },
    houseOrigin: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    mode: {
        type: String,
        enum: ['truck', 'train', 'ship']
    },
    status: {
        type: Boolean
    },
    shippingStatus: {
        type: Boolean
    },
    shipping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping'
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    gpsId: {
        type: String,
        required: true,
        unique: true
    }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle