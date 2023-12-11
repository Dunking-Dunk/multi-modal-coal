import mongoose from 'mongoose';

const PointSchema = {
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinate: {
            type: [Number],
            required: true
        }
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
    startDate: {
        type: Date
    },
    eta: {
        type: Date
    },
    direction: {
        polyline: [{
            type: [Number],
        }],
        distanceAndDuration: [
            {
                distance: Number,
                duration: Number
            }
        ],
    },
    dispatch: {
        type: Boolean,
    },
    railRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Railroute'
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
    startDate: {
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
export const Shipping = mongoose.model('Shipping', shippingSchema)
