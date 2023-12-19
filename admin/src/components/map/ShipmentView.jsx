import React, { useEffect, useState, useRef } from "react";
import { MarkerF, Polyline } from "@react-google-maps/api";
import { forEach } from "lodash";
import { useSelector } from "react-redux";

import Map from "./Map";
import VehicleMarker from "./VehicleMarker";
import { map } from 'lodash'

const ShipmentView = ({ allPlaces }) => {
    const [routes, setRoutes] = useState()
    const polygonRef = useRef()
    const { vehicles } = useSelector((state) => state.Vehicle)

    useEffect(() => {
        let routes = []
        forEach(allPlaces, (route) => {
            routes.push(route.direction.polyline)
        })
        setRoutes(routes)
    }, [allPlaces])

    return (
        <Map>
            {vehicles && map(allPlaces, (place) => {
                return (
                    <React.Fragment key={place._id}>
                        <MarkerF position={{ lat: place.origin.location.coordinate[1], lng: place.origin.location.coordinate[0] }} />

                        {place.status === 'dispatched' && place.status !== 'completed' && map(place.vehicles, (vehicle) => {
                            const current = vehicles.find((v) => v._id === vehicle._id)
                            return <VehicleMarker vehicle={current} key={vehicle._id} />
                        })}
                    </React.Fragment>
                )
            })}

            <MarkerF position={{ lat: allPlaces[allPlaces.length - 1].destination.location.coordinate[1], lng: allPlaces[allPlaces.length - 1].destination.location.coordinate[0] }} />
            {routes && map(routes, (route, index) => {
                const polyLine = route.map((poly) => ({ lat: poly[0], lng: poly[1] }))

                return (
                    <Polyline
                        ref={polygonRef}
                        key={index}
                        path={polyLine}
                        options={{
                            strokeColor: '#F94C10',
                            strokeOpacity: allPlaces[index]?.status === 'dispatched' ? 1 : 0.2,
                            strokeWeight: 3,
                        }} />
                )
            })
            }
        </Map>
    )
}

export default ShipmentView