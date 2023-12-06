import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';

import Vehicle from './Vehicle/Index';
import User from './User/Index';
import { useDispatch } from 'react-redux';
import { getAllVehicle } from '../store/reducer/VehicleReducer';
import { getAllUsers } from '../store/reducer/UserReducer';

const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllVehicle())
        dispatch(getAllUsers())
    }, [])

    return (
        <div className='px-12 h-full w-full  mb-8'>
            <Header />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<Vehicle />} path='/vehicle/*' />
                <Route element={<User />} path='/user/*' />
            </Routes>
        </div>
    )
}

export default Main