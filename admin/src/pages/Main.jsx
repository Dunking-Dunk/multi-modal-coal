import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';

import Vehicle from './Vehicle/Index';
import { useDispatch } from 'react-redux';
import { getAllVehicle } from '../store/reducer/VehicleReducer';

const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllVehicle())
    }, [])

    return (
        <div className='px-12 h-full w-full'>
            <Header />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<Vehicle />} path='/vehicle/*' />
            </Routes>
        </div>
    )
}

export default Main