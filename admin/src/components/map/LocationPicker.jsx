import React, { memo, useEffect, useState, useRef } from "react";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MarkerF } from '@react-google-maps/api';
import Map from './Map'

const MapMarker = ({ getAddress, getCoord }) => {
    const [coords, setCoords] = useState({ lat: 13.078339, lng: 80.180592 })
    const [input, setInput] = useState('')

    useEffect(() => {
        getCoord(coords)
        let service = new google.maps.Geocoder();
        const helper = async () => {

            const res = await service.geocode({ location: coords })

            getAddress({ address: res.results[0].formatted_address, placeId: res.results[0].place_id })
        }
        helper()
    }, [coords])

    const handleClick = async (e) => {
        if (e.latLng) {
            setCoords((state) => ({ ...state, lat: e.latLng.lat(), lng: e.latLng.lng() }))
        }
    }

    const handleInput = async (e) => {
        e.stopPropagation()

        let service = new google.maps.Geocoder();

        try {
            const res = await service.geocode({ address: input })
            getAddress({ address: res.results[0].formatted_address, placeId: res.results[0].place_id })
            console.log()
            setCoords({ lat: res.results[0].geometry.location.lat(), lng: res.results[0].geometry.location.lng() })
        } catch (err) {
            console.log(err)
        }

    }

    async function onLoad(map) {
        map.current = map
    }

    return (
        <div className="w-full h-full relative">
            <Map
                onClick={handleClick}
                onLoad={(map) => onLoad(map)}
                center={coords}
            >
                <MarkerF position={coords} />
            </Map>
            <div className="absolute top-20 left-5">
                <p className="text-secondary">Type address</p>
                <div className="flex space-x-2">
                    <Input className='text-secondary' onChange={(e) => setInput(e.target.value)} value={input} />
                    <Button onClick={handleInput}>Search</Button>
                </div>
            </div>
        </div>

    )
}

export default MapMarker