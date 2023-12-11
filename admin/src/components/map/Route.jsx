import React, { useEffect, useState, memo, useRef } from 'react'
import Map from './Map'
import { useSelector } from 'react-redux'
import { DirectionsRenderer, MarkerF, OverlayViewF, OverlayView } from '@react-google-maps/api'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ImCancelCircle } from 'react-icons/im'
import polyline from '@mapbox/polyline'


const MapStop = ({ setSelectedStop, selectedStop }) => {
    const stops = useSelector((state) => state.Place.railyard)
    const [mapRef, setMapRef] = useState(null)
    const DirectionRef = useRef()
    const [selected, setSelected] = useState([])
    const [direction, setDirection] = useState(null)
    const [distanceAndDuration, setDistanceAndDuration] = useState([])

    useEffect(() => {
        DirectionRef.current = new google.maps.DirectionsService()
    }, [])

    useEffect(() => {
        const helper = async () => {
            try {
                if (selected.length > 1) {
                    const request = {
                        origin: { lat: selected[0].location.coordinate[1], lng: selected[0].location.coordinate[0] },
                        waypoints: selected.slice(1, -1).map((stop, index) => {
                            return { location: { lat: stop.location.coordinate[1], lng: stop.location.coordinate[0] }, stopover: true }
                        }),
                        destination: { lat: selected[selected.length - 1].location.coordinate[1], lng: selected[selected.length - 1].location.coordinate[0] },
                        travelMode: 'TRANSIT',
                        transitOptions: {
                            modes: ['TRAIN']
                        }
                    }

                    const res = await DirectionRef.current.route(request)
                    setDirection(res)
                    setDistanceAndDuration(res.routes[0].legs)
                    const poly = res.routes[0].overview_polyline
                    const poly_decode = polyline.decode(poly)
                    const distanceAndDuration = res.routes[0].legs.map((leg) => ({
                        distance: leg.distance.value,
                        duration: leg.duration.value
                    }))
                    setSelectedStop({ stops: selected, poly_decode, distanceAndDuration })

                }
            }
            catch (err) {
                console.log(err)
            }
        }

        helper()


    }, [selected])

    useEffect(() => {
        if (selectedStop === null) {
            setSelected([])
            setDirection(null)
            setDistanceAndDuration([])
        }
    }, [selectedStop])

    const onLoad = (map) => {
        setMapRef(map)
    }

    function getPixelPositionOffset(width, height) {
        return { x: -(width / 2), y: -(height / 2) };
    }

    const handleMarkerClick = (stop) => {
        if (selected.find((e) => e._id === stop._id)) {
            setSelected((state) => state.filter((e) => e._id !== stop._id))
        } else {
            setSelected((state) => ([...state, stop]))
        }
    }

    const handleRemove = (id) => {
        setSelected((state) => state.filter((e) => e._id !== id))
    }

    return (
        <div className='space-y-2'>
            <div className='h-[700px] w-full'>
                <Map onLoad={onLoad} >
                    {direction && <DirectionsRenderer directions={direction} />}
                    {stops.map((railyard, index) => {
                        const { location, name, address, type, id } = railyard

                        if (railyard) {
                            return (
                                <React.Fragment key={index}>
                                    <MarkerF position={{ lat: location.coordinate[1], lng: location.coordinate[0] }} onClick={() => {
                                        handleMarkerClick(railyard)
                                    }} />
                                    <OverlayViewF
                                        position={{ lat: location.coordinate[1], lng: location.coordinate[0] }}
                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                        getPixelPositionOffset={getPixelPositionOffset} >

                                        <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute w-[200px]" >
                                            {
                                                type === 'port' ? <img src="/images/Port.png" className="w-10 h-10" /> :
                                                    type === 'railyard' ? <img src="/images/Station.png" className="w-10 h-10" /> : <img src="/images/Factory.png" className="w-10 h-10" />
                                            }
                                            <div className="flex flex-col">
                                                <h5 className="text-lg">{name}</h5>
                                                <p>{address}</p>
                                            </div>
                                        </div>
                                    </OverlayViewF>
                                </React.Fragment>
                            )
                        }
                    })}
                </Map>
            </div>
            <Card className="h-full p-2 w-full">
                <CardHeader>
                    <CardTitle>Stops</CardTitle>
                    <CardDescription>Select the stops in the order required from the  map</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-2'>
                        {
                            selected.map((route, index) => {
                                return (
                                    <Card className='h-full p-4 space-y-1' key={index}>
                                        <div className='flex flex-row justify-between '>
                                            <CardTitle>{index + 1}) {route.name}</CardTitle>
                                            <ImCancelCircle size={22} className='cursor-pointer' onClick={() => handleRemove(route._id)} />
                                        </div>
                                        <CardDescription>{route.address}</CardDescription>
                                        {index === 0 && (
                                            <div className='py-2'>
                                                <CardDescription>Starting Stop</CardDescription>
                                            </div>
                                        )}
                                        {index >= 1 && (
                                            <div className='py-2'>
                                                <CardDescription>Estimated distance from prev stop</CardDescription>
                                                <p className='font-bold'>{distanceAndDuration[index - 1]?.distance?.text}</p>
                                                <CardDescription>Estimated duration from prev stop</CardDescription>
                                                <p className='font-bold'>{distanceAndDuration[index - 1]?.duration?.text}</p>
                                            </div>
                                        )}

                                    </Card>)
                            })
                        }
                    </div>
                    {distanceAndDuration.lenth > 0 && (
                        <div className='py-2'>
                            <CardDescription>Total Distance</CardDescription>

                            <CardDescription>Total Estimated Time</CardDescription>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

    )
}

export default memo(MapStop)