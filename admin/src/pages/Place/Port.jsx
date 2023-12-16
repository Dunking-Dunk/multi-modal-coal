import React from "react";
import { useSelector } from "react-redux";

import { PlaceColumn } from "../../lib/columns";
import DataTable from "../../components/DataTable";
import PlaceView from "../../components/map/PlaceView";

const Port = () => {
    const { port } = useSelector((state) => state.Place)

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Port</h1>
            <div className="w-5/6 h-[65vh]">
                <PlaceView places={port} />
            </div>
            <h3 className="text-4xl font-bold">Manage Ports</h3>
            <DataTable columns={PlaceColumn} data={port} />
        </div>
    )
}

export default Port