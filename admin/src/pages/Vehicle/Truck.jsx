import React from "react";
import Map from "../../components/map/Map";

import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";
import { useLocation } from "react-router-dom";

const Truck = () => {
    const { search } = useLocation()
    const manage = new URLSearchParams(search).get('manage')
    const { trucks } = useSelector((state) => state.Vehicle)

    if (manage) {
        return (
            <div className="flex flex-col space-y-6 w-full h-full py-6">
                <h1 className="text-4xl font-bold">Manage Trucks</h1>
                <DataTable columns={VehicleColumn} data={trucks} />
            </div>
        )

    }
    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Trucks</h1>
            <div className="w-full h-[600px]">
                <Map >

                </Map>
            </div>

        </div>
    )

}

export default Truck;