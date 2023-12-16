import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import Truck from "./Truck";
import VehicleHeader from "../../components/VehicleHeader";
import Train from "./Train";
import Ship from "./Ship";
import CreateVehicle from "./CreateVehicle";
import UpdateVehicle from './UpdateVehicle'
import ViewVehicle from "./View";
import socket from "../../api/socket";



const Vehicle = () => {
    const { vehicles } = useSelector((state) => state.Vehicle)

    useEffect(() => {
        if (vehicles) {
            socket.getAllVehiclesLocations("allVehicles")
            return () => {
                socket.leaveRoom("allVehicles")
            }
        }
    }, [vehicles])

    return (
        <div className="pb-2">
            <VehicleHeader />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<ViewVehicle />} path='/:id' />
                <Route element={<CreateVehicle />} path='/create' />
                <Route element={<UpdateVehicle />} path='/update/:id' />
                <Route element={<Truck />} path='/truck' />
                <Route element={<Train />} path='/train' />
                <Route element={<Ship />} path='/ship' />
            </Routes>
        </div>

    )
}

export default Vehicle