import React from "react";
import { Routes, Route } from 'react-router-dom'

import ShipmentHeader from "../../components/ShipmentHeader";
import Dashboard from "./Dashboard";
import CreateShipment from "./Create";
import ManageShipment from "./Manage";
import ViewShipment from './View'
import { useEffect } from "react";
import socket from "../../api/socket";

const Index = () => {
    useEffect(() => {
        socket.getAllVehiclesLocations("allVehicles")

        return () => {
            socket.leaveRoom('allVehicles')
        }
    }, [])


    return (
        <div className="pb-10">
            <ShipmentHeader />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/manage' element={<ManageShipment />} />
                <Route path='/create' element={<CreateShipment />} />
                <Route path='/:id' element={<ViewShipment />} />
            </Routes>
        </div>

    )
}

export default Index