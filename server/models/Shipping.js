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

const shippingSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Shipping Quantity required']
    },
    origin: PointSchema ,
    destination: PointSchema,
    vehicles: [
        {
            origin: PointSchema,
            destination: PointSchema,
            vehicle: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vehicle',
                required: [true, 'Vehicle is required']
            }],
            numberOfVehicle: {
                type: Number,
                required: [true, 'Number of Vehicle is required'],
            },
            eta: {
                type: Number
            },
            deadline: {
                type: Date
            }
       }
    ],
    eta: {
        type: Number
    },
    deadline: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Shipping = mongoose.model('Shipping', shippingSchema)

export default Shipping