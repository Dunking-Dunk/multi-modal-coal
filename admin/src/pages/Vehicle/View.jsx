import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "../../components/Loader";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getVehicle, getVehicleShipment } from "../../store/reducer/VehicleReducer";
import CardOverview from "../../components/OverviewCard";
import socket from "../../api/socket";
import VehicleMap from "../../components/map/VehicleView";
import Table from '../../components/DataTable'
import { vehicleShippingColumn } from "../../lib/columns";
import { getLogs } from "../../store/reducer/LogReducer";
import Log from "../../components/Log";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { FaTruck } from "react-icons/fa";
  import { Bargraph } from "../../components/Visual/Bargraph";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"   

const ViewVehicle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { vehicle } = useSelector((state) => state.Vehicle)
    const { logs } = useSelector((state) => state.Log)
    const [tracker, setTracker] = useState(null)

    useEffect(() => {
        dispatch(getVehicle(id)).then(() => {
            dispatch(getVehicleShipment(id))
            dispatch(getLogs(id))
        })
    }, [])

    useEffect(() => {
        if (vehicle) {
            setTracker(vehicle.tracker)
            socket.getVehicleLocation(vehicle.trackerId, setTracker)
        }

        return () => {
            socket.leaveRoom(vehicle?.trackerId)
        }
    }, [vehicle])

    if (vehicle && tracker) {
        return (
            <div className="space-y-4 mt-10 w-full h-full">
                <div className="flex flex-row gap-x-4 w-full h-[70vh]">
                    <div className="w-full h-full">
                        <VehicleMap tracker={tracker} vehicle={vehicle} />
                    </div>
                    <div className="flex flex-col w-1/4 gap-y-2 h-full">
                        <h3 className="text-2xl font-medium">Vehicle Logs</h3>
                        <ScrollArea className="w-full h-full space-y-2">
                            {logs.map((log) => <Log key={log._id} log={log} />)}
                        </ScrollArea>
                    </div>
                </div>
                <h3 className="text-4xl font-bold border-b-2">Vehicle Details</h3>
                <div className="flex flex-row space-x-2">
                    <CardOverview title='Status' description={"Vehicle Status"} value={tracker?.active ? 'Active' : 'Offline'} />
                    <CardOverview title='Speed' description={"Vehicle speed in km/h (kilometer per hour)"} value={tracker.speed} />
                    <CardOverview title='Fuel' description={"Fuel level of the vehicle"} value={tracker.fuelLevel} />
                    <CardOverview title='Type' description={"Vehicle Type"} value={vehicle.type} />
                    <CardOverview title='Register Number' description={"Vehicle Registration Number"} value={vehicle.registerNumber} />
                </div>
                <div className="flex space-x-2">
                    {vehicle.driver && (
                        <>
                            <div className="flex space-x-8 items-center p-6 cursor-pointer rounded-xl border-2 w-full" onClick={() => {
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
                    <CardOverview title='Capacity' description={"Vehicle Coal holding capacity in Kilo"} value={vehicle.capacity} />
                    <CardOverview title='Make' description={"Vehicle Make"} value={vehicle.make} />
                    <CardOverview title='Model' description={"Vehicle Model"} value={vehicle.model} />
                    <CardOverview title='Tracker ID' description={"Vehicle Tracker ID related to iot module"} value={vehicle.trackerId} />
                </div>
                <div className="pt-6">
                    <h3 className="text-2xl font-semibold">Vehicle Shipment</h3>
                    <p className="pb-8">All the assigned Shipments for the vehicle</p>
                    {vehicle.shipments ? <Table columns={vehicleShippingColumn} data={vehicle.shipments} /> : <p className="text-3xl font-semibold mt-8">No shipment is assigned</p>}
                </div>
                <div className="pt-6 space-y-2">
                    <h1 className="text-4xl font-bold border-b-2">Vehicle Stats</h1>
                    <h3 className="text-2xl font-semibold pt-4">Truck Information</h3>
                    <h3 className="text-1xl">Engine Information</h3>
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='HorsePower' description={"Fuel efficiency in kilometers per litre"} value={"230 HP"} Icon={<FaTruck size={20} color="grey"/>} />
                        <CardOverview title='Engine Capacity' description={"Size of the engine in litres"} value={"6.7 L"} />
                        <CardOverview title='Engine Age' description={"Lifespan of the engine"} value={"5 Years"} />
                        <CardOverview title='Emission Standard' description={"The truck complies with emission standards."} value={"BS VI"} />
                    </div>
                    <h3 className="text-1xl">Vehicle Raw Statistics</h3>
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='Engine Temperature' description={"Temperature of the engine"} value={tracker?.engineTemp}  />
                        <CardOverview title='Coolant Temperature' description={"Size of the engine in litres"} value={tracker?.coolantTemp} />
                        <CardOverview title='Transmission Temperature' description={"Lifespan of the engine"} value={tracker?.transmissionTemp} />
                        <CardOverview title='Emission' description={"Carbon emission"} value={tracker?.co2emission} />
                    </div>
      
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='Engine status' description={"Engine current status (on/off)"} value={tracker?.engineStatus ? 'ON' : 'OFF'} Icon={<FaTruck size={20} color="grey"/>} />
                        <CardOverview title='Engine RPM' description={"Engine RPM"} value={tracker?.engineRpm} />
                        <CardOverview title='Torque' description={"Vehicle Producing Torque"} value={tracker.torque} />
                        <CardOverview title='Battery Level' description={"Vehicle Battery Level"} value={tracker.batteryLevel} />
                        <CardOverview title='Voltage' description={"Vehicle Battery Voltage"} value={tracker.batteryVoltage} />
                    </div>
                    
                    {/* <h1 className=" border-b-2 pt-4"></h1> */}
                    <div className="text-3xl font-bold pt-8 border-b-2">Charts</div>
                    <Tabs className="space-y-4">
                        <TabsContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                                    <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Mileage</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Bargraph/>
                                    </CardContent> 
                                    </Card>
                                    <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Recent Shipments</CardTitle>
                                        <CardDescription>
                                        <Bargraph/>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    </CardContent>
                                    </Card>
                                </div>
                                
                             </TabsContent>
                             </Tabs>
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