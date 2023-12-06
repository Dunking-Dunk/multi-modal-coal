import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { getVehicle } from "../../store/reducer/VehicleReducer";
import CardOverview from "../../components/OverviewCard";

import Map from '../../components/map/Map'

const ViewVehicle = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { vehicle } = useSelector((state) => state.Vehicle)

    useEffect(() => {
        dispatch(getVehicle(id))
    }, [])

    if (vehicle) {
        return (
            <div className="flex flex-col space-y-4 mt-10 ">
                <div className="flex flex-row gap-x-4 w-full h-[600px]">
                    <div className="w-4/5 h-full">
                        <Map />
                    </div>
                    <div className="flex flex-col w-1/4 gap-y-2 h-full">

                    </div>
                </div>
                <div className="flex flex-row space-x-2">
                    <CardOverview title='Type' description={"Vehicle Type"} value={vehicle.type.toUpperCase()} />
                    <CardOverview title='Register Number' description={"Vehicle Registration Number"} value={vehicle.registerNumber} />
                    <CardOverview title='Make' description={"Vehicle Make"} value={vehicle.make} />
                    <CardOverview title='Model' description={"Vehicle Model"} value={vehicle.model} />
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