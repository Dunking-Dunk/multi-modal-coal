import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { getPlace } from "../../store/reducer/PlaceReducer";
import CardOverview from "../../components/OverviewCard";

import Map from '../../components/map/Map'

const ViewPlace = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { place } = useSelector((state) => state.Place)

    useEffect(() => {
        dispatch(getPlace(id))
    }, [])

    if (place) {
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
                    <CardOverview title='Type' description={"Place Type"} value={place.type.toUpperCase()} />
                    <CardOverview title='Name' description={"Place Name"} value={place.name} />
                    <CardOverview title='Coal Type' description={"Coal Type"} value={place.coalType} />
                    <CardOverview title='Quantity' description={"Coal Quantity"} value={place.quantity} />
                    <CardOverview title='Location' description={"Location"} value={place.location} />
                    <CardOverview title='Address' description={"Address"} value={place.address} />
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

export default ViewPlace;
