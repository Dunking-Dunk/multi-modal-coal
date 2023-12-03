import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../api/axios'

export const login = createAsyncThunk('user/login', async (body, thunkAPI) => {
    try {
        const user = await api.post('/users/login', body)
        const data = user.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const logout = createAsyncThunk('user/logout', async (body, thunkAPI) => {
    try {
        await api.post('/users/logout')
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const currentUser = createAsyncThunk('user/currentUser', async (body, thunkAPI) => {
    try {
        const user = await api.get('/users/me')
        const data = user.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

const UserReducer = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false
    },
    reducers: {
        addUser: (state,action) => {
            state.user = action.payload
        },
        removeUser: (state,action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.loading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null
            state.loading = false
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(currentUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(currentUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.loading = false
        })
        builder.addCase(currentUser.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const {addUser, removeUser} = UserReducer.actions

export default UserReducer.reducer