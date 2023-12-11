import React from "react";

import Map from '../../components/map/Map'

const Dashboard = () => {
    return (
        <div className="w-full">
            <h1 className='text-4xl font-bold mb-4'>Shipment</h1>
            <div className="w-full h-[700px]">
                <Map />
            </div>

        </div>
    )
}

export default Dashboard