import React, { useEffect, useState } from "react";
import { MarkerF, Polyline } from "@react-google-maps/api";

import Map from "./Map";

const ShipmentView = ({ allPlaces }) => {
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        allPlaces.forEach((route) => {
            setRoutes((state) => [...state, route.direction.polyline])
        })
    }, [])

    return (
        <Map>
            {allPlaces.map((place, index) => {
                return (
                    <MarkerF position={{ lat: place.origin.location.coordinate[1], lng: place.origin.location.coordinate[0] }} key={index} />
                )

            })}
            <MarkerF position={{ lat: allPlaces[allPlaces.length - 1].destination.location.coordinate[1], lng: allPlaces[allPlaces.length - 1].destination.location.coordinate[0] }} />
            {routes.map((route, index) => {
                const polyLine = route.map((poly) => ({ lat: poly[0], lng: poly[1] }))
                return (
                    <Polyline
                        key={index}
                        path={polyLine}

                        options={{
                            strokeColor: '#F94C10',
                            strokeOpacity: allPlaces[index]?.status === 'dispatched' ? 1 : 0.1,
                            strokeWeight: 3,

                        }} />
                )
            })
            }
        </Map>
    )
}

export default ShipmentView