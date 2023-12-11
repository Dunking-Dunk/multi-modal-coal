import React, { useEffect, useState } from "react";
import { MarkerF, OverlayViewF, OverlayView, Polyline } from '@react-google-maps/api'
import Map from "./Map";
import { useSelector } from "react-redux";

const ShipmentFormMap = ({ index, setSubShipment, subShipment }) => {
    const { places, railroute, mines, railyard, port } = useSelector((state) => state.Place)
    const [shipment, setShipment] = useState([])

    useEffect(() => {
        if (shipment.length === 2) {
            setSubShipment((state) => ([...state, shipment]))
        }
    }, [shipment])

    function getPixelPositionOffset(width, height) {
        return { x: -(width / 2), y: -(height / 2) };
    }

    const handleClick = (e) => {
        console.log(e)
    }

    const markers = (state) => {
        return state.map((place) => {
            return (
                <React.Fragment key={place._id}>
                    <MarkerF position={{ lat: place.location.coordinate[1], lng: place.location.coordinate[0] }} onClick={() => {
                        setShipment((state) => ([...state, place]))
                    }} />
                    <OverlayViewF
                        position={{ lat: place.location.coordinate[1], lng: place.location.coordinate[0] }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        getPixelPositionOffset={getPixelPositionOffset} >

                        <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute w-[300px] -top-12 left-6" onClick={() => {
                            if (!place)
                                navigate(`/place/${id}`)
                        }}>
                            {
                                place.type === 'port' ? <img src="/images/Port.png" className="w-10 h-10" /> :
                                    place.type === 'railyard' ? <img src="/images/Station.png" className="w-10 h-10" /> : <img src="/images/Factory.png" className="w-10 h-10" />
                            }
                            <div className="flex flex-col">
                                <h5 className="text-lg">{place.name}</h5>
                                <p>{place.address}</p>
                            </div>
                        </div>
                    </OverlayViewF>
                </React.Fragment>
            )
        })
    }

    const renderMarker = () => {
        if (shipment.length < 2) {
            if (subShipment.length <= 0) {
                return markers(places)
            } else if (subShipment[subShipment.length - 1][1].type === 'railyard') {
                return (
                    <>
                        {railroute.map((route, index) => {
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
                        })}
                        {markers(railyard)}
                    </>

                )
            } else if (subShipment[subShipment.length - 1][1].type === 'port') {
                return markers(port)
            } else {
                return markers(places)
            }
        }
    }


    return (
        <div className="w-full h-full space-y-2 py-4">
            <h3 className="text-2xl font-semibold">Shipment - {index + 1}</h3>
            <div className="flex flex-row space-x-4">
                <Map onClick={handleClick} style={{ width: '50%', height: '700px' }}>
                    {renderMarker()}
                </Map>
                <div className="flex flex-col w-2/3">
                    {shipment.map((place) => {
                        return (
                            <div className="p-4" key={place._id}>
                                <h5>{place.name}</h5>
                                <p>{place.type}</p>
                            </div>
                        )

                    })}

                </div>
            </div>
        </div>

    )
}

export default ShipmentFormMap