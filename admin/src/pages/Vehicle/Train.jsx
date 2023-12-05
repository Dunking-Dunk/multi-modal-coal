import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Map from "../../components/map/Map";
import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";


const Train = () => {
    const { search } = useLocation()
    const manage = new URLSearchParams(search).get('manage')
    const { wagons } = useSelector((state) => state.Vehicle)

    if (manage) {
        return (
            <div className="flex flex-col space-y-6 w-full h-full py-6">
                <h1 className="text-4xl font-bold">Manage Wagons</h1>
                <DataTable columns={VehicleColumn} data={wagons} />
            </div>
        )
    }


    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Wagons</h1>
            <div className="w-full h-[600px]">
                <Map >

                </Map>
            </div>
        </div>
    )
}

export default Train;