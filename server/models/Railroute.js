import mongoose from 'mongoose';

const railrouteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        }
    ],
    polyline: [
           {
                type: [Number],
                required: true,
            }
    ],
    distanceAndDuration: [
        {
            distance: Number,
            duration: Number
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Railroute = mongoose.model('Railroute', railrouteSchema)

export default Railroute