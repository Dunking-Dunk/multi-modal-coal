import React from "react";
import { useSelector } from 'react-redux'

import Map from "../../components/map/Map";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";

const Dashboard = () => {
    const { vehicles } = useSelector((state) => state.Vehicle)

    return (
        <div className="flex flex-col gap-y-4 w-full h-full mb-10">
            <h3 className="font-bold text-4xl">Dashboard</h3>
            <div className="flex flex-row justify-between border-b-2 py-4">
                <h5 className="text-2xl">Create a Vehicle</h5>
                <Button className='w-1/6'>
                    <Link to='create' className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
                </Button>

            </div>
            <div className=" w-full h-[600px]">
                <Map >

                </Map>
            </div>
            <DataTable columns={VehicleColumn} data={vehicles} filterColumn='registerNumber' />
        </div>

    )
}

export default Dashboard;