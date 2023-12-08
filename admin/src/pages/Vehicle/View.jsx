import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { getVehicle } from "../../store/reducer/VehicleReducer";
import CardOverview from "../../components/OverviewCard";
import socket from "../../api/socket";
import VehicleMap from "../../components/map/VehicleView";

const ViewVehicle = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { vehicle } = useSelector((state) => state.Vehicle)
    const [tracker, setTracker] = useState(null)

    useEffect(() => {
        dispatch(getVehicle(id))
    }, [])

    useEffect(() => {
        if (vehicle)
            socket.getVehicleLocation(vehicle.trackerId, setTracker)

        return () => {
            socket.stopVehicleLocation(vehicle?.trackerId)
        }
    }, [vehicle])

    if (vehicle) {
        return (
            <div className="flex flex-col space-y-4 mt-10 ">
                <div className="flex flex-row gap-x-4 w-full h-[600px]">
                    <div className="w-4/5 h-full">
                        <VehicleMap tracker={tracker} vehicle={vehicle} />
                    </div>
                    <div className="flex flex-col w-1/4 gap-y-2 h-full">
                        <CardOverview title='Status' description={"Vehicle Status"} value={tracker ? 'Active' : 'Offline'} />
                        <CardOverview title='Tracker ID' description={"Vehicle Tracker ID related to iot module"} value={vehicle.trackerId} />
                        <CardOverview title='Speed' description={"Vehicle speed in km/h (kilometer per hour)"} value={tracker ? tracker.speed : 0} />

                    </div>
                </div>
                <h1 className="text-3xl font-bold">Vehicle Details</h1>
                <div className="flex flex-row space-x-2">
                    <CardOverview title='Type' description={"Vehicle Type"} value={vehicle.type.toUpperCase()} />
                    <CardOverview title='Register Number' description={"Vehicle Registration Number"} value={vehicle.registerNumber} />
                    <CardOverview title='Make' description={"Vehicle Make"} value={vehicle.make} />
                    <CardOverview title='Model' description={"Vehicle Model"} value={vehicle.model} />
                    <CardOverview title='Capacity' description={"Vehicle Coal holding capacity"} value={vehicle.capacity} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader />
            </div>
        )

    }

}

export default ViewVehicle