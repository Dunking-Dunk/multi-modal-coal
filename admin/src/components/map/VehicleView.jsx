import React from "react";
import { MarkerF, OverlayViewF, OverlayView } from '@react-google-maps/api'

import Status from "../ActiveStatus";
import Map from "./Map";

const VehicleView = ({ vehicle, tracker }) => {
    const { location: { coordinate: [lng, lat] }, speed } = tracker ? tracker : vehicle

    return (
        <Map center={{ lat, lng }} zoom={18}>
            <MarkerF position={{ lat, lng }} icon={{ url: `/images/${vehicle.type}.png` }} />
            <OverlayViewF
                position={{ lat, lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}

            >
                <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute left-16 -top-44 w-[200px] " >
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
        </Map>
    )
}

export default VehicleView