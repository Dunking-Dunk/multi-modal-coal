import mongoose from 'mongoose';


const placeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    coalStored: {
        type: Number,
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
    placeId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    supervisor: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Place = mongoose.model('Place', placeSchema)

export default Place