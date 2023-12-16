import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './MainReducer.js'

const store = configureStore({
    reducer: {
      Main: AuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})


export default store