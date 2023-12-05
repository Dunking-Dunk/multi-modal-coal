import React from "react";
import { Routes, Route } from 'react-router-dom'

import Dashboard from "./Dashboard";
import Truck from "./Truck";
import VehicleHeader from "../../components/VehicleHeader";
import Train from "./Train";
import Ship from "./Ship";
import CreateVehicle from "./CreateVehicle";

const Vehicle = () => {
    return (
        <>
            <VehicleHeader />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<CreateVehicle />} path='/create' />
                <Route element={<Truck />} path='/truck' />
                <Route element={<Train />} path='/wagon' />
                <Route element={<Ship />} path='/ship' />
            </Routes>
        </>

    )
}

export default Vehicle