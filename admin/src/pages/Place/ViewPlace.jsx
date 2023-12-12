import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { getPlace, getPlaceShipments } from "../../store/reducer/PlaceReducer";
import CardOverview from "../../components/OverviewCard";
import { Card } from '@/components/ui/Card'

import { placeShippingColumn } from '../../lib/columns'
import PlaceView from "../../components/map/PlaceView";
import Table from '@/components/DataTable'

const ViewPlace = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { place } = useSelector((state) => state.Place)

    useEffect(() => {
        dispatch(getPlace(id)).then(() => {
            dispatch(getPlaceShipments(id))
        })
    }, [])

    console.log(place)

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
                    </div>
                    <div className="flex flex-row space-x-2">
                        <Card className='p-4 w-full'>
                            <h5 className="font-bold text-2xl">Place Address</h5>
                            <p>{place.state}</p>
                            <p>{place.address}</p>
                        </Card>
                        {place.supervisor && (
                            <Card className='p-4 w-full cursor-pointer flex flex-row space-x-4 items-center' onClick={() => {
                                navigate(`/user/${place.supervisor._id}`)
                            }}>
                                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                    <img src={place.supervisor.image.url} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-2xl">Supervisor</h5>
                                    <p>{place.supervisor.name}</p>
                                    <p>{place.supervisor.contact}</p>
                                </div>
                            </Card>
                        )}
                    </div>

                </div>
                <div className="space-y-4">
                    <h3 className="text-3xl font-semibold">Shipments</h3>
                    {place.shipments ? (
                        <div>
                            <p className="pb-6">All The Shipments that would reach here need to be transfered to another mode</p>
                            <Table columns={placeShippingColumn} data={place.shipments} />
                        </div>
                    ) : <p>No Shipment is assigned to this place</p>}
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
