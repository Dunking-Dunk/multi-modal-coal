import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getVehicle = createAsyncThunk('main/getAllVehicle', async (body, thunkAPI) => {
    try {
       
        const vehicles = await api.get(`/vehicles/driver/${body}`)
        console.log(vehicles)
        const data = vehicles.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getPlaces = createAsyncThunk('main/getAllPlaces', async (body, thunkAPI) => {
    try {
        const vehicles = await api.get(`/places/supervisor/${body}`)
        const data = vehicles.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

const authReducer = createSlice({
    name: 'main',
    initialState: {
        user: null,
        location: null,
        vehicle: null, 
        places: [],
        shipments: []
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVehicle.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getVehicle.fulfilled, (state, action) => {
            state.vehicle = action.payload.vehicle
            state.loading = false
        })
        builder.addCase(getVehicle.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getPlaces.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getPlaces.fulfilled, (state, action) => {
            state.places = action.payload.places
            state.loading = false
        })
        builder.addCase(getPlaces.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { setUser, setUserLocation } = authReducer.actions
export default authReducer.reducer