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
        enum: ['truck', 'train', 'ship'],
        required: [true, 'Vehicle Mode Number Required'],
    },
    status: {
        type: Boolean
    },
    shipment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping'
    }],
    shippingStatus: {
        type: Boolean
    },
    //this is the id that is present in respective vehicle tcu with base details
    trackerId: {
        type: String,
        required: true,
        unique: true
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
    speed: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinate: {
            type: [Number],
            default: [0,0]
        },
    },
    //
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

vehicleSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('User').remove({ vehicle: this._id }, next);
  });

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle