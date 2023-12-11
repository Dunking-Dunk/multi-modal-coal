import React, { memo, useEffect, useState, useRef } from "react";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MarkerF } from '@react-google-maps/api';
import Map from './Map'

const MapMarker = ({ getAddress, setCoords, coords }) => {
    const [input, setInput] = useState('')

    useEffect(() => {
        setCoords(coords)
        let service = new google.maps.Geocoder();
        const helper = async () => {
            try {

                const res = await service.geocode({ location: coords })
                const address = res.results[0].address_components.find((address) => address.types[0] === "administrative_area_level_1")
                getAddress({ address: res.results[0].formatted_address, placeId: res.results[0].place_id, state: address.long_name })
            } catch (error) {
                // console.log(error)
            }

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
            const address = res.results[0].address_components.find((address) => address.types[0] === "administrative_area_level_1")
            getAddress({ address: res.results[0].formatted_address, placeId: res.results[0].place_id, state: address.long_name })

            setCoords({ lat: res.results[0].geometry.location.lat(), lng: res.results[0].geometry.location.lng() })
        } catch (err) {
            // console.log(err)
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
                <p className="text-primary">Type address</p>
                <div className="flex space-x-2">
                    <Input className='text-primary' onChange={(e) => setInput(e.target.value)} value={input} />
                    <Button onClick={handleInput}>Search</Button>
                </div>
            </div>
        </div>

    )
}

export default MapMarker