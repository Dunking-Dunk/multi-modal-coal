import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from 'moment'
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import PlaceCard from "@/components/PlaceCard";
import { getShipment } from "../../store/reducer/ShipmentReducer";
import ShipmentViewMap from "../../components/map/ShipmentView";
import Loader from "../../components/Loader";
import { shippingVehicleViewColumn } from '../../lib/columns'
import Table from '../../components/DataTable'
import StepperComp from "../../components/Stepper";
import { getLogs } from "../../store/reducer/LogReducer";
import Log from "../../components/Log";
import socket from "../../api/socket";

const View = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { shipment } = useSelector((state) => state.Shipment)
    const { logs } = useSelector((state) => state.Log)

    useEffect(() => {
        dispatch(getShipment(id)).then(() => {
            dispatch(getLogs(id))
        })
        socket.getIndividualLog(id)
        socket.getShipment(id)

        return () => {
            socket.leaveRoom(id)
        }
    }, [dispatch, id])

    if (shipment)
        return (
            <div className="mt-10 space-y-5">
                <h1 className="text-4xl font-bold">Shipment</h1>
                <div className="flex flex-row space-x-4 w-full h-[65vh]">
                    <div className="w-4/5 h-full">
                        <ShipmentViewMap allPlaces={shipment.subShipping} />
                    </div>
                    <div className="w-1/5 h-full">
                        <h3 className="text-2xl font-medium">Shipment Logs</h3>
                        <ScrollArea className="w-full h-full space-y-2">
                            {logs.map((log) => <Log key={log._id} log={log} />)}
                        </ScrollArea>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <h3 className="text-4xl font-medium border-b-2 p-2">Shipment Overview</h3>
                    <Tabs className="space-y-4">
                    <TabsContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Quantity of Coal
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{shipment.quantity}</div>
                                <p className="text-xs text-muted-foreground">
                                in (kilo tons)
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                    Total Number of Sub-Shipments
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{shipment.subShipping.length}</div>
                            </CardContent>
                        </Card>
                        {/* <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Dates
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-xl font-medium">{moment(shipment.startDate).format("MMMM Do YYYY, h:mm")} - {moment(shipment.eta).format('MMMM Do YYYY, h:mm')}</p>
                            </CardContent>
                        </Card> */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Shipment Status
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{shipment.status}</div>
                            </CardContent>
                        </Card>
                    </div>

                    </TabsContent>
                    </Tabs>
                    <div className="space-y-2">
                        {/* <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Total Quantity of coal: </h5>
                            <p className="text-xl font-medium">{shipment.quantity} in (kilo tons)</p>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Total Number of Sub-Shipment </h5>
                            <p className="text-xl font-medium">{shipment.subShipping.length}</p>
                        </div> */}
                        <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Dates</h5>
                            <p className="text-xl font-medium">{moment(shipment.startDate).format("MMMM Do YYYY, h:mm")} - {moment(shipment.eta).format('MMMM Do YYYY, h:mm')}</p>
                        </div>
                        {/* <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Shipment Status: </h5>
                            <p className="text-xl font-medium">{shipment.status}</p>
                        </div> */}
                    </div>
                    <div className='flex flex-col justify-between relative my-5 '>
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                            <h5 className='font-bold'>Origin</h5>
                            <PlaceCard place={shipment.subShipping[shipment.subShipping.length - 1].origin.place ? shipment.subShipping[shipment.subShipping.length - 1].origin.place : shipment.subShipping[shipment.subShipping.length - 1].origin.customPlace} />
                            </div>
                            
                            {/* Add margin-bottom to create a gap */}
                            <div className="w-[100%] text-center mb-4">
                            <h1>To</h1>
                            <Progress value={shipment.status === 'completed' ? 100 : 10} className="w-[100%] -z-10 " />
                            </div>

                            <div className="space-y-2">
                            <h5 className='font-bold'>Destination</h5>
                            <PlaceCard place={shipment.subShipping[shipment.subShipping.length - 1].destination.place ? shipment.subShipping[shipment.subShipping.length - 1].destination.place : shipment.subShipping[shipment.subShipping.length - 1].destination.customPlace} />
                            </div>
                        </div>
                        </div>


                </div>
                <div className="pt-6 flex flex-col space-y-6">
                    <h3 className="text-4xl font-medium">Detailed Shipment View</h3>
                    {
                        shipment.subShipping.map((shipment, index) => {
                            return (
                                <div className="py-4" key={index}>
                                    <h4 className="text-2xl font-medium border-b-2 p-2">Sub-Shipment - {index + 1}</h4>
                                    <div className="space-y-2 mt-2">
                                        <div className="flex space-x-4 items-center">
                                            <h5 className="opacity-60">Date: </h5>
                                            <p className="text-xl font-medium">{moment(shipment.startDate).format("MMMM Do YYYY, h:mm")} - {moment(shipment.eta).format('MMMM Do YYYY, h:mm')}</p>
                                        </div>
                                        <div className="flex space-x-4 items-center">
                                            <h5 className="opacity-60">Status: </h5>
                                            <p className="text-xl font-medium">{shipment.status}</p>
                                        </div>
                                    </div>
                                    <StepperComp shipment={shipment} />
                                    <h4 className="text-2xl font-medium mb-2">All Vehicles</h4>
                                    <Table columns={shippingVehicleViewColumn} data={shipment.vehicles} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    else {
        return <div className="w-full h-full flex items-center justify-center">
            <Loader />
        </div>
    }
}

export default View