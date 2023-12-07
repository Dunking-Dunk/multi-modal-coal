import React from "react";
import { useSelector } from "react-redux";

import { PlaceColumn } from "../../lib/columns";
import DataTable from "../../components/DataTable";
import Map from "../../components/map/Map";

const Inventory = () => {
    const { inventory } = useSelector((state) => state.Place)

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Inventory</h1>
            <div className="w-5/6 h-[600px]">
                <Map >

                </Map>
            </div>
            <h3 className="text-4xl font-bold">Manage Inventories</h3>
            <DataTable columns={PlaceColumn} data={inventory} />
        </div>
    )
}

export default Inventory