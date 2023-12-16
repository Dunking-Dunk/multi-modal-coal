import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';

import Vehicle from './Vehicle/Index';
import User from './User/Index';
import Place from './Place/Index'
import Shipping from './Shipping/Index'

import { useDispatch } from 'react-redux';
import { getAllUsers } from '../store/reducer/UserReducer';
import { getAllPlaces, getAllRailroute } from '../store/reducer/PlaceReducer';
import { getAllVehicle } from '../store/reducer/VehicleReducer';
import { getAllShipments, getAllSubShipments } from '../store/reducer/ShipmentReducer';
import { getAllLogs } from '../store/reducer/LogReducer';

const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllPlaces())
        dispatch(getAllRailroute())
        dispatch(getAllVehicle())
        dispatch(getAllShipments())
        dispatch(getAllLogs())
    }, [])

    return (
        <div className='px-12 h-full w-full  mb-8'>
            <Header />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<Vehicle />} path='/vehicle/*' />
                <Route element={<User />} path='/user/*' />
                <Route element={<Place />} path='/place/*' />
                <Route element={<Shipping />} path='/shipping/*' />
            </Routes>
        </div>
    )
}

export default Main