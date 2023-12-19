import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllShipmentsMap from '../../components/map/AllShipments'
import CardOverview from '../../components/OverviewCard'
import { getAllSubShipments } from "../../store/reducer/ShipmentReducer";
import {subShippingColumn}from '../../lib/columns'
import DataTable from "../../components/DataTable";

const Dashboard = () => {
    const { shipments, subShipments } = useSelector((state) => state.Shipment)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSubShipments())
    }, [])

    return (
        <div className="w-full">
            <div className="space-y-4">
                <div className="flex flex-row space-x-2 pt-4">
                    <CardOverview title='Shipments' description='Total Number of Shipments' value={shipments.length} />
                    <CardOverview title='Sub Shipments' description='Total Number of Sub-Shipments' value={subShipments.length} />
                    <CardOverview title='Active shipments' description='Total Number of Active shipments' value={shipments.length} />
                    <CardOverview title='Completed Shipments' description='Total Number of Completed Shipments' value={shipments.length} />
                </div>
                <h1 className='text-4xl font-bold my-2'>Active Shipments</h1>
                <div className="w-full h-[700px]">
                    <AllShipmentsMap subShipments={subShipments} />
                </div>
                <div className="py-2">
                    <h3 className="border-b-2 text-2xl mb-4">All Sub - Shipments</h3>
                    <DataTable columns={subShippingColumn} data={subShipments}/>
                </div>
            </div>

        </div>
    )
}

export default Dashboard