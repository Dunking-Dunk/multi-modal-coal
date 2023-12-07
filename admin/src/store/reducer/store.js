import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './UserReducer'
import VehicleReducer from './VehicleReducer'
import PlaceReducer from './PlaceReducer'

export default configureStore({
    reducer: {
        User: UserReducer,
        Vehicle: VehicleReducer,
        Place: PlaceReducer,
    }
})