import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { getPlace } from "../../store/reducer/PlaceReducer";
import CardOverview from "../../components/OverviewCard";
import { Card } from '@/components/ui/Card'

import PlaceView from "../../components/map/PlaceView";

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
                        <PlaceView places={[place]} place={true} />
                    </div>
                    <div className="flex flex-col w-1/4 gap-y-2 h-full">

                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <h3 className="text-4xl font-bold">Place Detail</h3>
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='Type' description={"Place Type"} value={place.type.toUpperCase()} />
                        <CardOverview title='Name' description={"Place Name"} value={place.name} />
                        <CardOverview title='Coal Stored' description={"Coal Stored (in tons)"} value={place.coalStored} />
                        <CardOverview title='Supervisor' description={"Place supervisor"} value={place.supervisor.name} />
                    </div>
                    <Card className='p-4'>
                        <h5 className="font-bold text-2xl">Place Address</h5>
                        <p>{place.address}</p>
                    </Card>
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
