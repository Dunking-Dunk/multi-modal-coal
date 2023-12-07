import React from "react";
import { useSelector } from "react-redux";

import { PlaceColumn } from "../../lib/columns";
import DataTable from "../../components/DataTable";
import Map from "../../components/map/Map";

const Railyard = () => {
    const { railyard } = useSelector((state) => state.Place)

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Railyard</h1>
            <div className="h-[600px] w-5/6">
                <Map >

                </Map>
            </div>
            <h3 className="text-4xl font-bold">Manage Railyards</h3>
            <DataTable columns={PlaceColumn} data={railyard} />
        </div>
    )
}

export default Railyard