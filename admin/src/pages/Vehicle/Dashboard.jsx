import React from "react";
import { useSelector } from 'react-redux'

import Map from "../../components/map/Map";
import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";
import CardOverview from "../../components/OverviewCard";

const Dashboard = () => {
    const { vehicles } = useSelector((state) => state.Vehicle)

    return (
        <div className="flex flex-col gap-y-4 w-full h-full">
            <h3 className="font-bold text-4xl">Dashboard</h3>
            <div className=" w-full h-[600px]">
                <Map >

                </Map>
            </div>
            <div className="flex flex-row space-x-4">
                <CardOverview title='Vehicles' description='Total Number of Vehicles' value={vehicles.length} />
                <CardOverview title='Active Vehicles' description='Total Number of Active Vehicles' value={vehicles.length} />
                <CardOverview title='Trucks' description='Total Number of Trucks' value={vehicles.length} />
                <CardOverview title='Vehicles' description='Total Number of Wagons' value={vehicles.length} />
                <CardOverview title='Vehicles' description='Total Number of Ships' value={vehicles.length} />
            </div>
            <div className="my-4 space-y-2">
                <h3 className="text-3xl font-semibold">Manage All Vehicles</h3>
                <DataTable columns={VehicleColumn} data={vehicles} filterColumn='registerNumber' />
            </div>

        </div>

    )
}

export default Dashboard;