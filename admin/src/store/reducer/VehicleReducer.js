import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../api/axios'

export const getAllVehicle = createAsyncThunk('vehicle/getAllVehicle', async (body, thunkAPI) => {
    try {
        const vehicles = await api.get('/vehicles')
        const data = vehicles.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getVehicle = createAsyncThunk('vehicle/getVehicle', async (body, thunkAPI) => {
    try {
        const vehicle = await api.get(`/vehicles/${body}`,)
        const data = vehicle.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const createVehicle = createAsyncThunk('vehicle/createVehicle', async (body, thunkAPI) => {
    try {
        const vehicle = await api.post('/vehicles', body)
        const data = vehicle.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

const VehicleReducer = createSlice({
    name: 'vehicle',
    initialState: {
        vehicles: [],
        trucks: [],
        wagons: [], 
        ships: [],
        vehicle: null,
        loading: false
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVehicle.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllVehicle.fulfilled, (state, action) => {
            state.vehicles = action.payload.vehicles
            state.wagons = action.payload.vehicles.filter((vehicle) => vehicle.type === 'wagon')
            state.trucks = action.payload.vehicles.filter((vehicle) => vehicle.type === 'truck')
            state.ships = action.payload.vehicles.filter((vehicle) => vehicle.type === 'ship')
            state.loading = false
        })
        builder.addCase(getAllVehicle.rejected, (state, action) => {
            state.loading = false
        })
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
        builder.addCase(createVehicle.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createVehicle.fulfilled, (state, action) => {
            state.vehicles.push(action.payload.vehicle)
            state[`${action.payload.vehicle.type}s`].push( action.payload.vehicle)
            state.loading = false
        })
        builder.addCase(createVehicle.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default VehicleReducer.reducer