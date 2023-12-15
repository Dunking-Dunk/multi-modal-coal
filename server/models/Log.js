import mongoose from 'mongoose';

const logsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Message required'],
    },
    title: {
        type: String,
    },
    reference: [{
        id: mongoose.Schema.Types.ObjectId,
        ref: {
            type: String,
            enum:  ['vehicle', 'shipping', 'place']
        },
    }]
}, {
    timestamps: true
})

const Logs = mongoose.model('Log', logsSchema)

export default Logs