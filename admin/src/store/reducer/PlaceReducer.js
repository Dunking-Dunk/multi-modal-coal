import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/axios';

export const getAllPlaces = createAsyncThunk('places/getAllPlaces', async (body, thunkAPI) => {
    try {
        const places = await api.get('/places');
        const data = places.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const getPlace = createAsyncThunk('places/getPlace', async (body, thunkAPI) => {
    try {
        const place = await api.get(`/places/${body}`);
        const data = place.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const getPlaceShipments = createAsyncThunk('places/getPlaceShipments', async (body, thunkAPI) => {
    try {
        const place = await api.get(`/shipments/place/${body}`);
        const data = place.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const createPlace = createAsyncThunk('places/createPlace', async (body, thunkAPI) => {
    try {
        const place = await api.post('/places', body);
        const data = place.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const updatePlace = createAsyncThunk('places/updatePlace', async (body, thunkAPI) => {
    try {
      
        const place = await api.put(`/places/${body.id}`, body.data);
        const data = place.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const deletePlace = createAsyncThunk('places/deletePlace', async (body, thunkAPI) => {
    try {
        await api.delete(`/places/${body}`);
        return body;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const createRailroute = createAsyncThunk('places/createRailroute', async (body, thunkAPI) => {
    try {
        const place = await api.post('/route/rail', body);
        const data = place.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

export const getAllRailroute = createAsyncThunk('places/getAllRailroute', async (body, thunkAPI) => {
    try {
        const place = await api.get('/route/rail');
        const data = place.data;
        return data;
    } catch (err) {
        if (err) {
            return thunkAPI.rejectWithValue({ error: err.response.data });
        }
    }
});

const PlaceReducer = createSlice({
    name: 'place',
    initialState: {
        places: [],
        mines: [],
        inventory: [],
        railyard: [],
        railroute: [],
        port: [],
        place: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPlaces.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllPlaces.fulfilled, (state, action) => {
            state.places = action.payload.places;
            state.mines = action.payload.places.filter((place) => place.type === 'mines');
            state.inventory = action.payload.places.filter((place) => place.type === 'inventory');
            state.railyard = action.payload.places.filter((place) => place.type === 'railyard');
            state.port = action.payload.places.filter((place) => place.type === 'port');
            state.loading = false;
        });
        builder.addCase(getAllPlaces.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getPlace.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPlace.fulfilled, (state, action) => {
            state.place = action.payload.place;
            state.loading = false;
        });
        builder.addCase(getPlace.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getPlaceShipments.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPlaceShipments.fulfilled, (state, action) => {
            state.place = {...state.place, shipments: action.payload.shipments};
            state.loading = false;
        });
        builder.addCase(getPlaceShipments.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createPlace.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createPlace.fulfilled, (state, action) => {
            state.places.push(action.payload.place);
            state[action.payload.place.type].push(action.payload.place);
            state.loading = false;
        });
        builder.addCase(createPlace.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deletePlace.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deletePlace.fulfilled, (state, action) => {
            state.places = state.places.filter((place) => place._id !== action.payload);
            state.mines = state.mines.filter((place) => place._id !== action.payload);
            state.inventory = state.inventory.filter((place) => place._id !== action.payload);
            state.railyard = state.railyard.filter((place) => place._id !== action.payload);
            state.port = state.port.filter((place) => place._id !== action.payload);
            state.loading = false;
        });
        builder.addCase(deletePlace.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updatePlace.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updatePlace.fulfilled, (state, action) => {
            state.places[state.places.findIndex((place) => place._id === action.payload.place._id)] = action.payload.place;
            state[action.payload.place.type][state[action.payload.place.type].findIndex((place) => place._id === action.payload.place._id )] = action.payload.place
        });
        builder.addCase(updatePlace.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createRailroute.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createRailroute.fulfilled, (state, action) => {
            state.railroute.push(action.payload.railroute);
            state.loading = false;
        });
        builder.addCase(createRailroute.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getAllRailroute.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllRailroute.fulfilled, (state, action) => {
            state.railroute = action.payload.railroutes;
            state.loading = false;
        });
        builder.addCase(getAllRailroute.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export default PlaceReducer.reducer;
