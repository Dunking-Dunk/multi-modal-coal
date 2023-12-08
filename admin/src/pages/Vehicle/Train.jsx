import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";
import CardOverview from '../../components/OverviewCard'
import AllVehiclesView from "../../components/map/allVehicles";
import socket from '../../api/socket'

const Train = () => {
    const { search } = useLocation()
    const manage = new URLSearchParams(search).get('manage')
    const { wagons } = useSelector((state) => state.Vehicle)
    const [trackers, setTrackers] = useState(null)

    useEffect(() => {
        if (wagons) {
            socket.getAllVehiclesLocations("wagon", setTrackers)
            return () => {
                socket.stopAllVehicleLocations("wagon")
            }
        }
    }, [])

    if (manage) {
        return (
            <div className="flex flex-col space-y-6 w-full h-full py-6">
                <div className="flex flex-row justify-between border-b-2 py-4">
                    <h5 className="text-2xl">Create Wagon</h5>
                    <Button className='w-1/6 py-0 px-0'>
                        <Link to='/vehicle/create' className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
                    </Button>
                </div>
                <h1 className="text-4xl font-bold">Manage Wagons</h1>
                <DataTable columns={VehicleColumn} data={wagons} />
            </div>
        )
    }


    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h1 className="text-4xl font-bold">Wagons</h1>
            <div className="flex flex-row space-x-4">
                <div className="w-5/6 h-[600px]">
                    <AllVehiclesView trackers={trackers} allVehicles={wagons} />
                </div>
                <div className="flex flex-col space-y-4 w-1/6">
                    <CardOverview title='Total' description='Total Number of Wagons' value={wagons.length} />
                    <CardOverview title='Active' description='Total Number of Active Wagons' value={wagons.length} />
                </div>
            </div>


        </div>
    )
}

export default Train;