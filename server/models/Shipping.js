import mongoose from 'mongoose';

const PointSchema = {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinate: {
        type: [Number],
        required: true
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    }
}

const subShippingSchema = mongoose.Schema({
    origin: PointSchema,
    destination: PointSchema,
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: [true, 'Vehicle is required']
    }],
    numberOfVehicle: {
        type: Number,
        required: [true, 'Number of Vehicle is required'],
    },
    startTime: {
        type: Date
    },
    eta: {
        type: Date
    }
})

const shippingSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Shipping Quantity required']
    },
    origin: PointSchema ,
    destination: PointSchema,
    subShipping: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubShipping'
    }
    ],
    startTime: {
        type: Date
    },
    eta: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


export const SubShipping = mongoose.Schema('SubShipping', subShippingSchema)
const Shipping = mongoose.model('Shipping', shippingSchema)

export default Shipping