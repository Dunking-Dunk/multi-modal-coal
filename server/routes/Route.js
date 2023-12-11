import express from 'express'

import { authenticatedUser} from '../middleware/Auth.js'
import Railroute from "../models/RailRoute.js";
import Place from '../models/Place.js';

const router = express.Router()


router.get('/rail', authenticatedUser,async (req, res) => {
    const railroutes = await Railroute.find({})

    res.status(200).json({
        success: true,
        railroutes
    })
})

router.post('/rail',authenticatedUser, async (req, res) => {
    const railroute = await Railroute.create(req.body)

    await railroute.stops.forEach(async(stop) => {
        await Place.findByIdAndUpdate(stop, { $push : {railroute: railroute._id} })
    })
    
    res.status(200).json({
        success: true,
        railroute
    })
})

router.get('/rail/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
    const railroute = await Railroute.findById(id).populate('supervisor')

    res.status(200).json({
        success: true,
        railroute
    })
})

router.put('/rail/:id', authenticatedUser,async (req, res) => {
    const { id } = req.params
    
    const railroute = await Railroute.findByIdAndUpdate(id, {
        ...req.body
    })


    res.status(200).json({
        success: true,
        railroute
    })
})


router.delete('/rail/:id',authenticatedUser, async (req, res) => {
    const { id } = req.params
    
     await Railroute.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        id
    })
})


export default router