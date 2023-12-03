import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './UserReducer'

export default configureStore({
    reducer: {
        User: UserReducer
    }
})