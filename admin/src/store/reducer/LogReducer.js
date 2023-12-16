import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../api/axios'

export const getAllLogs = createAsyncThunk('log/getAllLogs', async (body, thunkAPI) => {
    try {
        const logs = await api.get('/logs')
        const data = logs.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getLogs = createAsyncThunk('log/getLogs', async (body, thunkAPI) => {
    try {
        const logs = await api.get(`/logs/all/${body}`)
    
        const data = logs.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})



const logReducer = createSlice({
    name: 'log',
    initialState: {
        allLogs: [],
        logs: [],
        log: null
    },
    reducers: {
        setNotification: (state, action) => {
            state.log = action.payload
        },
        addLog: (state, action) => { 
            state.logs.shift(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllLogs.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllLogs.fulfilled, (state, action) => {
            state.allLogs = action.payload.logs
            state.loading = false
        })
        builder.addCase(getAllLogs.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getLogs.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getLogs.fulfilled, (state, action) => {
            state.logs = action.payload.logs
            state.loading = false
        })
        builder.addCase(getLogs.rejected, (state, action) => {
            state.loading = false
        })
      
    }
})

export const { setNotification,addLog } = logReducer.actions

export default logReducer.reducer