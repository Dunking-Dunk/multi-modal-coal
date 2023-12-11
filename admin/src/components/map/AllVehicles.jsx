import React, { useEffect, useState } from "react";
import { MarkerF, OverlayViewF, Polyline, OverlayView } from '@react-google-maps/api'
import { useNavigate } from "react-router-dom";

import Map from "./Map";
import Status from "../ActiveStatus";
import { useSelector } from "react-redux";


const AllVehiclesView = ({ type, railroutes }) => {
    const navigate = useNavigate()
    const { vehicles } = useSelector((state) => state.Vehicle)
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        if (railroutes) {
            setRoutes(railroutes)
        }
    }, [railroutes])

    return (
        <Map>
            {vehicles.map((vehicle) => {
                const { location: { coordinate: [lng, lat] }, speed } = vehicle
                if (vehicle.type === type || type === 'all')
                    return (
                        <React.Fragment key={vehicle._id} >
                            <MarkerF position={{ lat, lng }} icon={{
                                url: `/images/${vehicle.type}.svg`,
                                size: new google.maps.Size(64, 72),
                                anchor: new google.maps.Point(10, 30),
                                scaledSize: new google.maps.Size(50, 50),
                            }} onClick={() => {
                                navigate(`/vehicle/${vehicle._id}`)
                            }} />
                            <OverlayViewF
                                position={{ lat, lng }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute left-12 -top-32 w-[200px] "  >
                                    <div className="flex flex-col space-y-1 w-full">
                                        <h5 className="text-lg font-bold uppercase border-b-2">{vehicle.make} - {vehicle.registerNumber}</h5>
                                        <div className="flex flex-row gap-x-2 items-center  justify-between w-full">
                                            <p className=" text-sm opacity-75">Health Status</p>
                                            <Status active={vehicle.status} size={20} />
                                        </div>
                                        <div className="flex flex-row gap-x-2 items-center justify-between">
                                            <p className=" text-sm opacity-75">Speed</p>
                                            <h5 className="text-xl font-medium">{speed} Km/h</h5>
                                        </div>
                                    </div>
                                </div>
                            </OverlayViewF>
                        </React.Fragment>
                    )
            })}
            {routes && (
                routes.map((route, index) => {
                    const polyLine = route.polyline.map((poly) => ({ lat: poly[0], lng: poly[1] }))
                    return (
                        <Polyline
                            key={index}
                            path={polyLine}
                            options={{
                                strokeColor: '#F94C10',
                                strokeOpacity: 1,
                                strokeWeight: 3,
                            }} />
                    )
                }))
            }
        </Map>
    )

}

export default AllVehiclesView