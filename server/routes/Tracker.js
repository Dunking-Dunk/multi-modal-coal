import express from 'express'

import Tracker from '../models/Tracker'
import Vehicle from '../models/Vehicle'

const router = express.Router()

router.post('/', async (req, res) => {
    const tracker = await Tracker.create(req.body) //trackerid
    await Vehicle.findOneAndUpdate({ trackerId: tracker.trackerId }, {
        tracker: tracker._id
    })
    res.sendStatus(200)
})

export default router