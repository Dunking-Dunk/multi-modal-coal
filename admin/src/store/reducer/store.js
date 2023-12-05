import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './UserReducer'
import VehicleReducer from './VehicleReducer'

export default configureStore({
    reducer: {
        User: UserReducer,
        Vehicle: VehicleReducer,
    }
})