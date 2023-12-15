import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './UserReducer'
import VehicleReducer from './VehicleReducer'
import PlaceReducer from './PlaceReducer'
import ShipmentReducer from './ShipmentReducer'
import LogReducer from './LogReducer'

export default configureStore({
    reducer: {
        User: UserReducer,
        Vehicle: VehicleReducer,
        Place: PlaceReducer,
        Shipment: ShipmentReducer,
        Log: LogReducer
    }
})