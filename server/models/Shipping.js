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
    },
    customPlace: {
        type: Object
    }
}

const subShippingSchema = new mongoose.Schema({
    origin: PointSchema,
    destination: PointSchema,
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Shipping'
    },
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
    status: {
        type: String,
        enum: ['processing','dispatched', 'completed'],
        default: 'processing'
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
    railRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Railroute'
    }
}, {
    timestamps: true,
})

const shippingSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['dispatched', 'completed'],
        default: 'dispatched'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})




export const SubShipping = mongoose.model('SubShipping', subShippingSchema)
export const Shipping = mongoose.model('Shipping', shippingSchema)
