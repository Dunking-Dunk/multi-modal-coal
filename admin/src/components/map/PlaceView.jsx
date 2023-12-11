import React, { useEffect, useState, useRef } from "react";
import { MarkerF, OverlayViewF, OverlayView, Polyline } from '@react-google-maps/api'

import { useNavigate } from "react-router-dom";
import Supercluster from 'supercluster';
import MapView from "./Map";


const options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    maxZoom: 20,
    minZoom: 6
};
const sc = new Supercluster({ radius: 200, maxZoom: options.maxZoom });

const PlaceView = ({ places, place, railroutes }) => {
    const navigate = useNavigate()
    const mapRef = useRef()
    const [bounds, setBounds] = useState([0, 0, 0, 0]);
    const [zoom, setZoom] = useState(options.minZoom);
    const [clusters, setClusters] = useState()
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        setRoutes(railroutes)
    }, [railroutes])


    useEffect(() => {
        if (places) {
            const formattedData = places.map((place) => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: place.location.coordinate },
                properties: { cluster: false, ...place }
            }));
            sc.load(formattedData)
            setClusters(sc.getClusters(bounds, zoom));
        }

    }, [places, bounds, zoom])

    function handleClusterClick({ id, lat, lng }) {
        mapRef.current?.panTo({ lat, lng });
    }

    function handleBoundsChanged() {
        if (mapRef.current) {
            const bounds = mapRef.current.getBounds()?.toJSON();
            setBounds([bounds?.west || 0, bounds?.south || 0, bounds?.east || 0, bounds?.north || 0]);
        }
    }

    function handleZoomChanged() {
        if (mapRef.current) {
            setZoom(mapRef.current?.zoom);
        }
    }

    function handleMapLoad(map) {
        mapRef.current = map
        if (place) {
            mapRef.current?.panTo({ lat: places[0].location.coordinate[1], lng: places[0].location.coordinate[0] });
        }

    }

    function getPixelPositionOffset(width, height) {
        return { x: -(width / 2), y: -(height / 2) };
    }

    function PlaceMarker({ position, name, state, address, type, id }) {
        return (
            <>
                <MarkerF position={position} />
                <OverlayViewF
                    position={position}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset} >

                    <div className="flex flex-row space-x-4 bg-primary-foreground p-2 rounded-lg items-center absolute w-[300px]" onClick={() => {
                        if (!place)
                            navigate(`/place/${id}`)
                    }}>
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

            </>
        )
    }

    return (
        <MapView onBoundsChanged={handleBoundsChanged}
            onZoomChanged={handleZoomChanged}
            onLoad={handleMapLoad}
        >
            {clusters?.map(({ index, geometry, properties }) => {
                const [lng, lat] = geometry.coordinates;
                const { cluster, name, state, type, _id, address } = properties;


                return cluster
                    ? <MarkerF
                        key={`cluster-${index}`}
                        onClick={() => handleClusterClick({ id: _id, lat, lng })}
                        position={{ lat, lng }}
                        icon="/images/cluster-pin.png"
                        label={name} />
                    : <PlaceMarker
                        key={`place-${properties._id}`}
                        position={{ lat, lng }}
                        name={name}
                        state={state}
                        type={type}
                        id={_id}
                        address={address}
                    />
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
        </MapView>
    )
}


export default PlaceView