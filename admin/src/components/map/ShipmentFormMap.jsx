import React, { useEffect, useState } from "react";
import { MarkerF, OverlayViewF, OverlayView, Polyline } from '@react-google-maps/api'
import { useSelector } from "react-redux";

import Map from "./Map";
import Table from '../DataTable'
import { shippingVehicleFormColumn } from "../../lib/columns";
import { Button } from '@/components/ui/button'

const ShipmentFormMap = ({ index, setSubShipment, subShipment }) => {
    const { places, railroute, mines, railyard, port } = useSelector((state) => state.Place)
    const { vehicles } = useSelector((state) => state.Vehicle)
    const [shipment, setShipment] = useState([])
    const [shipmentVehicles, setShipmentVehicles] = useState([])
    const [submitted, setSubmitted] = useState(false)

    function getPixelPositionOffset(width, height) {
        return { x: -(width / 2), y: -(height / 2) };
    }

    const handleClick = (e) => {
        console.log(e)
    }

    const markers = (state) => {
        return state.map((place) => {
            return (
                <React.Fragment key={place._id}>
                    <MarkerF position={{ lat: place.location.coordinate[1], lng: place.location.coordinate[0] }} onClick={() => {
                        setShipment((state) => ([...state, place]))
                    }} />
                    <OverlayViewF
                        position={{ lat: place.location.coordinate[1], lng: place.location.coordinate[0] }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        getPixelPositionOffset={getPixelPositionOffset} >

                        <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute w-[300px] -top-12 left-6" onClick={() => {
                            if (!place)
                                navigate(`/place/${id}`)
                        }}>
                            {
                                place.type === 'port' ? <img src="/images/Port.png" className="w-10 h-10" /> :
                                    place.type === 'railyard' ? <img src="/images/Station.png" className="w-10 h-10" /> : <img src="/images/Factory.png" className="w-10 h-10" />
                            }
                            <div className="flex flex-col">
                                <h5 className="text-lg">{place.name}</h5>
                                <p>{place.address}</p>
                            </div>
                        </div>
                    </OverlayViewF>
                </React.Fragment>
            )
        })
    }

    const handleSubmit = () => {
        setSubShipment((state) => ([...state, {
            origin: {
                location: {
                    coordinate: shipment[0].location.coordinate
                },
                place: shipment[0]._id
            },
            destination: {
                location: {
                    coordinate: shipment[1].location.coordinate
                },
                place: shipment[1]._id
            },
            vehicles: shipmentVehicles,
        }]))

        setSubmitted(true)
    }

    return (
        <div className="w-full h-full space-y-2 py-6">
            <h3 className="text-4xl font-bold">Shipment - {index + 1}</h3>
            <div className="flex space-x-4">
                {shipment.length <= 1 && (
                    <div className="w-3/4 h-[700px]">
                        <Map onClick={handleClick} style={{ width: '100%', height: '100%' }}>
                            {
                                markers(places)
                            }

                        </Map>
                    </div>
                )}
                <div className={`flex flex-col ${shipment.length > 1 ? 'w-full' : 'w-1/4'}`}>
                    {
                        shipment.length > 0 && (
                            <div className="flex flex-row items-center justify-between">
                                <div className="p-6">
                                    <h5 className="text-2xl font-medium">{shipment[0].name}</h5>
                                    <p className="mb-5">{shipment[0].type}</p>
                                    <p>{shipment[0].address}</p>
                                </div>

                                {shipment[1] && (
                                    <>
                                        <p>To</p>
                                        <div className="p-6">
                                            <h5 className="text-2xl font-medium ">{shipment[1].name}</h5>
                                            <p className="mb-5">{shipment[1].type}</p>
                                            <p>{shipment[1].address}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    }
                    {
                        shipment.length > 1 && (
                            <>
                                <h3 className="text-2xl mb-2 font-bold">Select Vehicles for Shipment</h3>
                                <Table columns={shippingVehicleFormColumn} data={vehicles} getSelectedRow={setShipmentVehicles} />
                            </>
                        )
                    }

                </div>
            </div>
            <p>To Confirm</p>

            <Button onClick={handleSubmit} disabled={
                !(shipmentVehicles.length > 0 && !submitted)}>Create Sub Shippment</Button>

            {submitted && <p>Sub-Shipment Created</p>}
        </div>

    )
}

export default ShipmentFormMap