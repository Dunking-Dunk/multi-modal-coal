import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../api/axios'

export const getAllShipments = createAsyncThunk('shipment/getAllShipment', async (body, thunkAPI) => {
    try {
        const shipments = await api.get('/shipments')
        const data = shipments.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const createShipment = createAsyncThunk('shipment/createShipment', async (body, thunkAPI) => {
    try {
        const shipment = await api.post('/shipments', body)
        const data = shipment.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getShipment = createAsyncThunk('shipment/getShipment', async (body, thunkAPI) => {
    try {
        const shipment = await api.get(`/shipments/${body}`)
        const data = shipment.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const deleteShipment = createAsyncThunk('shipment/deleteShipment', async (body, thunkAPI) => {
    try {
         await api.delete(`/shipments/${body}`)
        return body;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getAllSubShipments = createAsyncThunk('shipment/getAllSubShipments',async (body, thunkAPI) => {
    try {
        const shipments = await api.get(`/shipments/subshipments`)
        
        const data = shipments.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

const ShipmentReducer = createSlice({
    name: 'shipment',
    initialState: {
        shipments: [],
        shipment: null,
        subShipments: []
    },
    reducers: {
        setShipment: (state, action) => {
            state.shipment = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllShipments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllShipments.fulfilled, (state, action) => {
            state.shipments = action.payload.shipments
            state.loading = false
        })
        builder.addCase(getAllShipments.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getShipment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getShipment.fulfilled, (state, action) => {
            state.shipment = action.payload.shipment
            state.loading = false
        })
        builder.addCase(getShipment.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(createShipment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createShipment.fulfilled, (state, action) => {
            state.shipments.shift(action.payload.shipment)
            state.loading = false
        })
        builder.addCase(createShipment.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteShipment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteShipment.fulfilled, (state, action) => {
        state.shipments = state.shipments.filter((shipment) => shipment._id !== action.payload)
            state.loading = false
        })
        builder.addCase(deleteShipment.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getAllSubShipments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllSubShipments.fulfilled, (state, action) => {
            state.subShipments = action.payload.shipments
            state.loading = false
        })
        builder.addCase(getAllSubShipments.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const {setShipment} = ShipmentReducer.actions
export default ShipmentReducer.reducer