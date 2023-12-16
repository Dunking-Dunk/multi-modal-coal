import React from "react";
import { useSelector } from "react-redux";

import { PlaceColumn } from "../../lib/columns";
import DataTable from "../../components/DataTable";
import PlaceView from "../../components/map/PlaceView";

const Railyard = () => {
    const { railyard, railroute } = useSelector((state) => state.Place)

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Railyard</h1>
            <div className="h-[65vh] w-5/6">
                <PlaceView places={railyard} railroutes={railroute} />
            </div>
            <h3 className="text-4xl font-bold">Manage Railyards</h3>
            {railyard && <DataTable columns={PlaceColumn} data={railyard} />}
        </div>
    )
}

export default Railyard