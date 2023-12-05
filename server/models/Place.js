import mongoose from 'mongoose';


const placeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    coalType: {
        type: String,
        required: [true, "Please enter Coal Type"],
    },
    quantity: {
        type: String,
        required: [true, "Please enter Coal Quantity"],
    },
    vehicleHousing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    type: {
        type: String,
        enum: ['mines', 'inventory', 'railyard', 'port'],
        default: 'railyard'
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
    address: {
        type: String,
        required: [true, "Please enter the address"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Place = mongoose.model('Place', placeSchema)

export default Place