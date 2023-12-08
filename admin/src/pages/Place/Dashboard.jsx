import React from "react";
import { useSelector } from 'react-redux'

import PlaceView from "../../components/map/PlaceView";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { PlaceColumn } from "../../lib/columns";


const Dashboard = () => {
    const { places } = useSelector((state) => state.Place)

    return (
        <div className="flex flex-col gap-y-4 w-full h-full">
            <h3 className="font-bold text-4xl">Dashboard</h3>
            <div className="flex flex-row justify-between border-b-2 py-4">
                <h5 className="text-2xl">Create a Place</h5>
                <Button className='w-1/6 py-0 px-0'>
                    <Link to='create' className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
                </Button>
            </div>
            <div className="w-full h-[600px]">
                <PlaceView places={places} />
            </div>
            <DataTable columns={PlaceColumn} data={places} filterColumn='name' />
        </div>
    )
}

export default Dashboard;
