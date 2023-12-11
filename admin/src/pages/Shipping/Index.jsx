import React from "react";
import { Routes, Route } from 'react-router-dom'

import ShipmentHeader from "../../components/ShipmentHeader";
import Dashboard from "./Dashboard";
import CreateShipment from "./Create";

const Index = () => {
    return (
        <div className="pb-10">
            <ShipmentHeader />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/create' element={<CreateShipment />} />
            </Routes>
        </div>

    )
}

export default Index