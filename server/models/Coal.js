import mongoose from 'mongoose';


const coalSchema = mongoose.Schema({
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
    vehicleHousing: {
        type: [mongoose.Schema.Types.ObjectId],
    },
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
})

const Tracker = mongoose.model('Tracker', trackerSchema)

export default Vehicle