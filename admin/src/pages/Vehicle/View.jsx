import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { getVehicle, getVehicleShipment } from "../../store/reducer/VehicleReducer";
import CardOverview from "../../components/OverviewCard";
import socket from "../../api/socket";
import VehicleMap from "../../components/map/VehicleView";
import Table from '../../components/DataTable'
import { vehicleShippingColumn } from "../../lib/columns";

const ViewVehicle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { vehicle } = useSelector((state) => state.Vehicle)
    const [tracker, setTracker] = useState(null)

    useEffect(() => {
        dispatch(getVehicle(id)).then(() => {
            dispatch(getVehicleShipment(id))
        })

    }, [])
    console.log(vehicle)

    useEffect(() => {
        if (vehicle)
            socket.getVehicleLocation(vehicle.trackerId, setTracker)

        return () => {
            socket.stopVehicleLocation(vehicle?.trackerId)
        }
    }, [vehicle])

    if (vehicle) {
        return (
            <div className="space-y-4 mt-10 w-full h-full">
                <div className="flex flex-row gap-x-4 w-full h-[600px]">
                    <div className="w-4/5 h-full">
                        <VehicleMap tracker={tracker} vehicle={vehicle} />
                    </div>
                    <div className="flex flex-col w-1/4 gap-y-2 h-full">
                        <CardOverview title='Status' description={"Vehicle Status"} value={tracker ? 'Active' : 'Offline'} />
                        <CardOverview title='Tracker ID' description={"Vehicle Tracker ID related to iot module"} value={vehicle.trackerId} />
                        <CardOverview title='Speed' description={"Vehicle speed in km/h (kilometer per hour)"} value={tracker ? tracker.speed : 0} />

                    </div>
                </div>
                <h3 className="text-4xl font-bold">Vehicle Details</h3>
                <div className="flex flex-row space-x-2">
                    <CardOverview title='Type' description={"Vehicle Type"} value={vehicle.type.toUpperCase()} />
                    <CardOverview title='Register Number' description={"Vehicle Registration Number"} value={vehicle.registerNumber} />
                    <CardOverview title='Make' description={"Vehicle Make"} value={vehicle.make} />
                    <CardOverview title='Model' description={"Vehicle Model"} value={vehicle.model} />
                    <CardOverview title='Capacity' description={"Vehicle Coal holding capacity"} value={vehicle.capacity} />
                </div>
                <div className="flex">
                    {vehicle.driver && (
                        <>
                            <div className="flex space-x-8 items-center p-6 cursor-pointer rounded-xl border-2" onClick={() => {
                                navigate(`/user/${vehicle.driver._id}`)
                            }}>
                                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                    <img src={vehicle.driver.image.url} className="object-cover" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <h3 className="text-2xl font-bold border-b-2">Driver Details</h3>
                                    <h5 className="text-xl font-bold">{vehicle.driver.name}</h5>
                                    <p className="text-lg">{vehicle.driver.contact}</p>
                                </div>
                            </div>
                        </>

                    )}
                </div>
                <div className="pt-6">
                    <h3 className="text-2xl font-semibold">Vehicle Shipment</h3>
                    <p className="pb-8">All the assigned Shipments for the vehicle</p>
                    {vehicle.shipments ? <Table columns={vehicleShippingColumn} data={vehicle.shipments} /> : <p className="text-3xl font-semibold mt-8">No shipment is assigned</p>}
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader />
            </div>
        )

    }

}

export default ViewVehicle