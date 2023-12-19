import express from 'express'

import Tracker from '../models/Tracker.js'
import Vehicle from '../models/Vehicle.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const tracker = await Tracker.create(req.body) //trackerid
 
    await Vehicle.findOneAndUpdate({ trackerId: tracker.trackerId }, {
        tracker: tracker._id,
        location: {
            coordinate: tracker.location.coordinate
        },
        speed: tracker.speed,
        active: tracker.engineStatus
    })
    res.sendStatus(200)
})

export default router