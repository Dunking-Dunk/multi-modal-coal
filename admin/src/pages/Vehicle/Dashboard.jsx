import React from "react";
import { useSelector } from 'react-redux'

import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";
import CardOverview from "../../components/OverviewCard";
import AllVehicleView from "../../components/map/allVehicles";
import { Doughnut } from "react-chartjs-2";
import Loader from "../../components/Loader";

const Dashboard = () => {
    const { vehicles, stats } = useSelector((state) => state.Vehicle)
    console.log(stats)
    if (vehicles) {
        return (
            <div className="flex flex-col gap-y-4 w-full h-full">
                <h3 className="font-bold text-4xl">Dashboard</h3>
                <div className=" w-full h-[600px]">
                    <AllVehicleView type='all' />
                </div>
                {stats && (
                    <>
                     <div className="flex flex-row space-x-2">
 <CardOverview title='Vehicles' description='Total Number of Vehicles' value={stats?.totalVehicle} />
 <CardOverview title='Active Vehicles' description='Total Number of Active Vehicles' value={stats?.activeVehicles} />
 <CardOverview title='Idle Vehicles' description='Total Number of Idle Vehicles' value={stats?.totalVehicle - stats?.activeVehicles} />
 <CardOverview title='Active Shipments' description='Total Number of vehicles active shipments' value={stats?.shipmentVehicles} />
</div>
<div className="grid grid-cols-2 h-[400px] py-2">
<Doughnut data={{
labels: ['train', 'ship', 'truck'],
datasets: [
{
 label: 'Vehicles',
 data: [stats.totalTrain, stats.totalShip, stats.totalTruck],
 backgroundColor: [
     'rgba(255, 99, 132, 0.2)',
     'rgba(255, 206, 86, 0.2)',
     'rgba(75, 192, 192, 0.2)',
 ],
 borderColor: [
     'rgba(255, 99, 132, 1)',
     'rgba(255, 206, 86, 1)',
     'rgba(75, 192, 192, 1)',
 ],
 borderWidth: 1,
},
],
}}/>
<div>
<CardOverview title='Vehicle' description='Total Vehicle capacity in kilo tons' value={stats?.totalVehiclesCapacity[0].total} />
</div>
</div>
                    </>        
                )}
               
                <div className="my-4 space-y-2">
                    <h3 className="text-3xl font-semibold">Manage All Vehicles</h3>
                    <DataTable columns={VehicleColumn} data={vehicles} filterColumn='registerNumber' />
                </div>
    
            </div>
        )}else {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <Loader/>
                </div>
            )
        }
}

export default Dashboard;