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

export const createUser = createAsyncThunk('user/create', async (body, thunkAPI) => {
    try {
        const user = await api.post('/users/create', body)
        const data = user.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const updateUser = createAsyncThunk('user/updateUser', async (body, thunkAPI) => {
    try {
        const user = await api.put(`/users/${body.id}`, body.data)
        const data = user.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (body, thunkAPI) => {
    try {
        const user = await api.get('/users')
        const data = user.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})

export const getUser = createAsyncThunk('user/getUser', async (body, thunkAPI) => {
    try {
        const user = await api.get(`/users/${body}`)
        const data = user.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({error: err.response.data})
        }
    }
})


export const deleteUser = createAsyncThunk('user/deleteUser', async (body, thunkAPI) => {
    try {
        await api.delete(`/users/${body}`)
        return body;
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
        users: [],
        person: null,
        admins: [],
        supervisors: [],
        drivers: [],
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
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.users.push(action.payload.user)
            state.loading = false
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.users[state.users.findIndex((user) => user._id === action.payload.user._id)] = action.payload.user
            state[`${action.payload.user.role}s`][state[`${action.payload.user.role}s`].findIndex((user) => user._id === action.payload.user._id )] = action.payload.user
            state.loading = false
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.users
            state.supervisors = action.payload.users.filter(user => user.role === 'supervisor')
            state.drivers = action.payload.users.filter(user => user.role === 'driver')
            state.admins = action.payload.users.filter(user => user.role === 'admin')
            state.loading = false
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.person = action.payload.user
            state.loading = false
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload)
            state.loading = false
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const {addUser, removeUser} = UserReducer.actions

export default UserReducer.reducer