import React from "react";
import { useSelector } from "react-redux";
import Map from '../../components/map/Map'
import CardOverview from '../../components/OverviewCard'

const Dashboard = () => {
    const { shipments } = useSelector((state) => state.Shipment)

    return (
        <div className="w-full">
            <h1 className='text-4xl font-bold my-4'>Shipments</h1>
            <div className="space-y-4">
                <div className="w-full h-[700px]">
                    <Map />
                </div>
                <div className="flex flex-row space-x-2">
                    <CardOverview title='Shipments' description='Total Number of Shipments' value={shipments.length} />
                    <CardOverview title='Active shipments' description='Total Number of Active Shipments' value={shipments.length} />
                    <CardOverview title='Completed Shipments' description='Total Number of Shipment Completed' value={shipments.length} />
                </div>
            </div>

        </div>
    )
}

export default Dashboard