import React from "react";
import MapView from "./Map";
import { MarkerF, Polyline, OverlayViewF, OverlayView } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { map } from "lodash";
import VehicleMarker from "./VehicleMarker";
import { useNavigate } from "react-router-dom";

function PlaceMarker({ place, onClick }) {
    return (
        <>
            <MarkerF position={{ lat: place.location.coordinate[1], lng: place.location.coordinate[0] }} onClick={onClick} />
            <OverlayViewF
                position={{ lat: place.location.coordinate[1], lng: place.location.coordinate[0] }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute w-[300px] left-6 -top-10" onClick={onClick}>
                    {
                        place.place.type === 'port' ? <img src="/images/Port.png" className="w-10 h-10" /> :
                            place.place.type === 'railyard' ? <img src="/images/Station.png" className="w-10 h-10" /> : <img src="/images/Factory.png" className="w-10 h-10" />
                    }
                    <div className="flex flex-col">
                        <h5 className="text-lg">{place.place.name}</h5>
                        <p>{place.place.address}</p>
                    </div>
                </div>
            </OverlayViewF>
        </>
    )
}

const AllShipments = ({ subShipments }) => {
    const { vehicles } = useSelector((state) => state.Vehicle)
    const navigate = useNavigate()

    return (
        <MapView>
            {map(subShipments, (shipment, index) => {
                if (shipment.status === 'dispatched' && shipment.status !== 'completed') {
                    const polyLine = shipment.direction.polyline.map((poly) => ({ lat: poly[0], lng: poly[1] }))
                    return (
                        <React.Fragment key={index}>
                            <PlaceMarker place={shipment.origin} onClick={() => {
                                navigate(`/shipping/${shipment.shipment}`)
                            }} />
                            <PlaceMarker place={shipment.destination} onClick={() => {
                                navigate(`/shipping/${shipment.shipment}`)
                            }} />
                            <Polyline
                                key={index}
                                path={polyLine}
                                onClick={() => {
                                    navigate(`/shipping/${shipment.shipment}`)
                                }}
                                options={{
                                    strokeColor: '#F94C10',
                                    strokeOpacity: shipment.status === 'dispatched' ? 1 : 0.2,
                                    strokeWeight: 3,
                                }} />
                            {map(shipment.vehicles, (vehicle) => {
                                const current = vehicles.find((v) => v._id === vehicle)
                                return <VehicleMarker vehicle={current} key={vehicle} />
                            })}
                        </React.Fragment>
                    )
                }
            })}
        </MapView>
    )
}

export default AllShipments