import React from "react";
import { MarkerF } from "@react-google-maps/api";

import Map from "./Map";

const ShipmentView = ({ allPlaces }) => {
    return (
        <Map>
            {allPlaces.map((place) => {
                return (
                    <MarkerF position={{ lat: place.origin.location.coordinate[1], lng: place.origin.location.coordinate[0] }} />
                )

            })}
            <MarkerF position={{ lat: allPlaces[allPlaces.length - 1].destination.location.coordinate[1], lng: allPlaces[allPlaces.length - 1].destination.location.coordinate[0] }} />
        </Map>
    )
}

export default ShipmentView