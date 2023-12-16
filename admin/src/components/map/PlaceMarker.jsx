import React from "react"
import { MarkerF, OverlayViewF, OverlayView } from '@react-google-maps/api'


function getPixelPositionOffset(width, height) {
    return { x: -(width / 2), y: -(height / 2) };
}

const PlaceMarkers = ({ state, setShipment }) => {
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

export default PlaceMarkers