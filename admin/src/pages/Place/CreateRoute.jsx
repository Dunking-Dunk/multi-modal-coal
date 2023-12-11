import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Route from "../../components/map/Route";
import { createRailroute } from '../../store/reducer/PlaceReducer'
import { useToast } from "@/components/ui/use-toast"

const CreateRoute = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [stops, setStops] = useState([])
    const [name, setName] = useState('')

    const handleSubmit = () => {
        const body = {
            name: name,
            polyline: stops.poly_decode,
            distanceAndDuration: stops.distanceAndDuration,
            stops: stops.stops.map((stop) => stop._id)
        }

        if (name && stops.poly_decode && stops.distanceAndDuration && stops.stops) {
            dispatch(createRailroute(body)).then((state) => {
                if (!state.error) {
                    toast({
                        title: "Route Created",
                        description: `Railway route is Created`
                    })
                    setName([])
                    setStops([])
                } else {
                    toast({
                        title: 'Error',
                        description: state.payload.error.message,
                        variant: 'destructive'
                    })
                }
            })
        }
    }

    return (
        <div className="flex flex-col space-y-4 mt-10 text-2xl font-bold">
            <h1>Create RailRoute </h1>
            <Input placeholder='Route Name' onChange={(e) => setName(e.target.value)} value={name} />
            <Route selectedStop={stops} setSelectedStop={setStops} />
            <Button onClick={handleSubmit}>Create Route</Button>
        </div>
    )
}

export default CreateRoute