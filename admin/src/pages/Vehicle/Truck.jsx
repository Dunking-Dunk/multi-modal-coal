import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AllVehiclesView from "../../components/map/allVehicles";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { VehicleColumn } from "../../lib/columns";
import { useLocation } from "react-router-dom";
import CardOverview from '../../components/OverviewCard'

const Truck = () => {
    const { search } = useLocation()
    const manage = new URLSearchParams(search).get('manage')
    const { trucks,stats } = useSelector((state) => state.Vehicle)

    if (manage) {
        return (
            <div className="flex flex-col space-y-6 w-full h-full py-6">
                <div className="flex flex-row justify-between border-b-2 py-4">
                    <h5 className="text-2xl">Create Truck</h5>
                    <Button className='w-1/6 py-0 px-0'>
                        <Link to='/vehicle/create' className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
                    </Button>
                </div>
                <h1 className="text-4xl font-bold">Manage Trucks</h1>
                <DataTable columns={VehicleColumn} filterColumn={'registerNumbers'} data={trucks} />
            </div>
        )

    }
    return (
        <div className="flex flex-col space-y-4 w-full h-full">
  <h1 className="text-4xl font-bold">Trucks</h1>
  
  <div className="flex flex-row space-x-4">
    <div className="w-5/6 h-[65vh]">
      <AllVehiclesView type={'truck'} />
    </div>
    
    <div className="flex flex-col space-y-4 w-1/6">
      <CardOverview 
        title='Total' 
        description='Total Number of Trucks' 
        value={trucks.length} 
      />
      <CardOverview 
        title='Active' 
        description='Total Number of Active Trucks' 
        value={stats?.activeTruck} 
      />
            <CardOverview 
        title='Idle' 
        description='Total Number of Idle Trucks' 
        value={trucks.length - stats?.activeTruck} 
      />
    </div>
  </div>
</div>

    )

}

export default Truck;