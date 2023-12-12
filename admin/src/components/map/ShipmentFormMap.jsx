import React, { useEffect, useState, useRef } from "react";
import { Polyline } from '@react-google-maps/api'
import { useSelector } from "react-redux";
import polyline from '@mapbox/polyline'

import Map from "./Map";
import Table from '../DataTable'
import { shippingVehicleFormColumn } from "../../lib/columns";
import { Button } from '@/components/ui/button'
import { getDistanceAndTime } from "../../lib/getDistanceAndTime";
import PlaceMarkers from "./PlaceMarker";

const ShipmentFormMap = ({ index, setSubShipment, subShipment }) => {
    const { places, railroute, mines, railyard, port } = useSelector((state) => state.Place)
    const DirectionRef = useRef()
    const { vehicles } = useSelector((state) => state.Vehicle)
    const [shipment, setShipment] = useState([])
    const [shipmentVehicles, setShipmentVehicles] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [directions, setDirections] = useState({ polyline: [], distanceAndDuration: [] })
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        if (railroute)
            setRoutes(railroute)
    }, [railroute])

    useEffect(() => {
        DirectionRef.current = new google.maps.DirectionsService()
    }, [])

    useEffect(() => {
        const helper = async () => {
            if (shipment[0].type !== 'railyard' || shipment[1].type !== 'railyard')
                try {
                    const request = {
                        origin: { lat: shipment[0].location.coordinate[1], lng: shipment[0].location.coordinate[0] },
                        destination: { lat: shipment[shipment.length - 1].location.coordinate[1], lng: shipment[shipment.length - 1].location.coordinate[0] },
                        travelMode: 'DRIVING'
                    }

                    const res = await DirectionRef.current.route(request)
                    const poly = res.routes[0].overview_polyline
                    const poly_decode = polyline.decode(poly)
                    const distanceAndDuration = res.routes[0].legs.map((leg) => ({
                        distance: leg.distance.value,
                        duration: leg.duration.value
                    }))
                    setDirections({ polyline: poly_decode, distanceAndDuration })
                }
                catch (err) {
                    console.log(err)
                }
        }

        const checkRailroute = () => {
            routes.forEach((route) => {

                if (route.stops.includes(shipment[0]._id) && route.stops.includes(shipment[1]._id)) {
                    setDirections({ polyline: route.polyline, distanceAndDuration: route.distanceAndDuration })
                }
            })
        }

        if (shipment.length > 1) {
            helper()
            checkRailroute()
        }

    }, [shipment])


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
            direction: directions
        }]))

        setSubmitted(true)
    }

    const handleClick = (e) => {

    }

    return (
        <div className="w-full h-full space-y-2 py-6">
            <h3 className="text-4xl font-bold">Shipment - {index + 1}</h3>
            <div className="flex space-x-4">
                {shipment.length <= 1 && (
                    <div className="w-3/4 h-[700px]">
                        <Map onClick={handleClick} style={{ width: '100%', height: '100%' }}>
                            <PlaceMarkers state={places} setShipment={setShipment} />
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
                    </div>
                )}
                <div className={`flex flex-col ${shipment.length > 1 ? 'w-full' : 'w-1/4'}`}>
                    {
                        shipment.length > 0 && (
                            <div className="flex flex-row items-center justify-between">
                                <div className="p-6">
                                    <h5 className="text-2xl font-medium">{shipment[0].name}</h5>
                                    <p className="mb-5">{shipment[0].type}</p>
                                    <p className="w-[300px]">{shipment[0].address}</p>
                                </div>

                                {shipment[1] && (
                                    <>
                                        <div className=" text-center">
                                            <p>To</p>
                                            {directions.distanceAndDuration && <p>{getDistanceAndTime(directions.distanceAndDuration)}</p>}
                                        </div>
                                        <div className="p-6">
                                            <h5 className="text-2xl font-medium ">{shipment[1].name}</h5>
                                            <p className="mb-5">{shipment[1].type}</p>
                                            <p className="w-[300px]">{shipment[1].address}</p>
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

