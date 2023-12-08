import React from "react";
import { MarkerF, OverlayViewF, OverlayView } from '@react-google-maps/api'
import { useNavigate } from "react-router-dom";

import Map from "./Map";
import Status from "../ActiveStatus";


const AllVehiclesView = ({ allVehicles, trackers }) => {
    const navigate = useNavigate()
    const vehicles = trackers ? trackers : allVehicles

    return (
        <Map>
            {vehicles.map((vehicle) => {
                const { location: { coordinate: [lng, lat] }, speed } = vehicle

                return (
                    <React.Fragment key={vehicle._id} >
                        <MarkerF position={{ lat, lng }} icon={{ url: `/images/${vehicle.type}.png` }} onClick={() => {
                            navigate(`/vehicle/${vehicle._id}`)
                        }} />
                        <OverlayViewF
                            position={{ lat, lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute left-12 -top-40 w-[200px] " onClick={() => {
                                navigate(`/vehicle/${vehicle._id}`)
                            }} >
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
        </Map>
    )

}

export default AllVehiclesView