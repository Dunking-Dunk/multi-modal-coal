import React, { memo, useRef, useState, useCallback, useEffect } from "react";

// import { darkMap } from '@/lib/mapTheme'
import { GoogleMap } from '@react-google-maps/api';

const MapView = (props) => {
    const mapRef = useRef(null);
    const [position, setPosition] = useState({
        lat: 13.078339,
        lng: 80.180592
    });


    function handleLoad(map) {

        mapRef.current = map;
    }

    function handleCenter() {
        if (!mapRef.current) return;

        const newPos = mapRef.current.getCenter().toJSON();
        setPosition(newPos);
    }

    return (
        <div className="w-full h-full rounded-md overflow-hidden">
            <GoogleMap
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                onDragEnd={handleCenter}
                onLoad={handleLoad}
                center={position}
                mapContainerClassName="map-container"
                {...props}
                options={{
                    clickableIcons: false,
                    mapId: "28fbb85fa828483f",
                    disableDefaultUI: false
                }}
            >
                {props.children}
            </GoogleMap>
        </div>
    )
}

export default memo(MapView)