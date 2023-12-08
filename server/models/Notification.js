import mongoose from 'mongoose';


const notifySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"],
    },
    message: {
        type: String,
        required: [true, "Please enter the message"],
    },

    duration: {
        type: Number,
        required: [true, "Please enter Duration"],
    },
    
    icon: {
        type: Image,     
    },

    native: {
        type: Boolean,
        default: true
        
    },
})

const Notification = mongoose.model('Place', notifySchema)

export default Notification