import React, { useEffect, useState, useRef } from "react";
import { Polyline } from '@react-google-maps/api'
import { useSelector } from "react-redux";
import polyline from '@mapbox/polyline'
import { find, forEach } from 'lodash'

import Map from "./Map";
import Table from '../DataTable'
import { shippingVehicleFormColumn } from "../../lib/columns";
import { Button } from '@/components/ui/button'
import { getDistanceAndTime } from "../../lib/getDistanceAndTime";
import PlaceMarkers from "./PlaceMarker";
import api from '../../api/axios'

const ShipmentFormMap = ({ index, setSubShipment, subShipment, startDate }) => {
    const { places, railroute, mines, railyard, port } = useSelector((state) => state.Place)
    const DirectionRef = useRef()
    const geoServiceRef = useRef()
    const { vehicles, trains, trucks, ships } = useSelector((state) => state.Vehicle)
    const [shipment, setShipment] = useState([])
    const [shipmentVehicles, setShipmentVehicles] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [directions, setDirections] = useState({ polyline: [], distanceAndDuration: [] })
    const [routes, setRoutes] = useState([])
    const [vehiclesForm, setVehiclesForm] = useState([])

    useEffect(() => {
        if (railroute)
            setRoutes(railroute)
    }, [railroute])

    useEffect(() => {
        DirectionRef.current = new google.maps.DirectionsService()
        geoServiceRef.current = new google.maps.Geocoder()
        if (subShipment.length > 0) {
            const place = find(places, (place) => place._id === subShipment[subShipment.length - 1].destination.place)
            if (place)
                setShipment([place])
            else
                setShipment([subShipment[subShipment.length - 1].destination.customPlace])
        }
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

        const checkRailrouteAndPlace = () => {
            forEach(routes, (route) => {
                if (route.stops.includes(shipment[0]._id) && route.stops.includes(shipment[1]._id)) {
                    setDirections({ polyline: route.polyline, distanceAndDuration: route.distanceAndDuration })
                }

                if (route.stops.includes(shipment[0]._id) && route.stops.includes(shipment[1]._id)) {
                    checkVehicle(trains, 'train')
                } else if (shipment[0].type === 'port') {
                    checkVehicle(ships, 'ship')
                }
                else {
                    checkVehicle(trucks, 'truck')
                }
            })
        }

        const checkVehicle = async (vehicles, type) => {
            const { totalTime } = getDistanceAndTime(directions.distanceAndDuration)
            const start = subShipment[subShipment.length - 1]?.eta ? subShipment[subShipment.length - 1].eta : startDate
            const eta = addTime(start, totalTime)
            const { data } = await api.get(`/shipments/vehicle/validateform?eta=${eta}&start=${start}&type=${type}`)
            setVehiclesForm(data.vehicles ? data.vehicles : vehicles)
        }


        if (shipment.length > 1) {
            helper()
            checkRailrouteAndPlace()
        }

    }, [shipment])

    const addTime = (theDate, milliseconds) => {
        return new Date(theDate.getTime() + milliseconds * 1000)
    }

    const handleSubmit = () => {
        const { totalTime } = getDistanceAndTime(directions.distanceAndDuration)
        const start = subShipment[subShipment.length - 1]?.eta ? subShipment[subShipment.length - 1].eta : startDate
        const eta = addTime(start, totalTime)

        setSubShipment((state) => ([...state, {
            origin: {
                location: {
                    coordinate: shipment[0].location.coordinate
                },
                place: shipment[0]._id && shipment[0]._id,
                customPlace: shipment[0]
            },
            destination: {
                location: {
                    coordinate: shipment[1].location.coordinate
                },
                place: shipment[1]._id && shipment[1]._id,
                customPlace: shipment[1]
            },
            vehicles: shipmentVehicles,
            direction: directions,
            startDate: start,
            eta,
            status: subShipment.length >= 1 ? 'processing' : 'dispatched'
        }]))

        setSubmitted(true)
    }

    const handleClick = async (e) => {
        const lng = e.latLng.lng()
        const lat = e.latLng.lat()
        const res = await geoServiceRef.current.geocode({ location: { lat, lng } })
        setShipment((state) => ([...state, {
            location: {
                coordinate: [lng, lat]
            },
            name: res.results[0].address_components[1].long_name,
            address: res.results[0].formatted_address,
            placeId: res.results[0].placeId,
            type: 'others'
        }]))
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
                                            {directions.distanceAndDuration && (
                                                <div>
                                                    <p>{getDistanceAndTime(directions.distanceAndDuration).totalDistance}</p>
                                                    <p>{getDistanceAndTime(directions.distanceAndDuration).totalTimeTaken}</p>
                                                </div>
                                            )}
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
                                <Table columns={shippingVehicleFormColumn} data={vehiclesForm} getSelectedRow={setShipmentVehicles} />
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

