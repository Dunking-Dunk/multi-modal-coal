import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"
import moment from 'moment'
import { Progress } from "@/components/ui/progress"

import PlaceCard from "@/components/PlaceCard";
import { getShipment } from "../../store/reducer/ShipmentReducer";
import ShipmentViewMap from "../../components/map/ShipmentView";
import Loader from "../../components/Loader";
import { shippingVehicleViewColumn } from '../../lib/columns'
import Table from '../../components/DataTable'
import StepperComp from "../../components/Stepper";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => <div className="p-4 rounded-xl border-2 my-2" key={i}>
        `v1.2.0-beta.${a.length - i}`
    </div>
)

const View = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { shipment } = useSelector((state) => state.Shipment)

    useEffect(() => {
        dispatch(getShipment(id))
    }, [])

    if (shipment)
        return (
            <div className="mt-10 space-y-5">
                <h1 className="text-4xl font-bold">Detailed Shipment View</h1>
                <div className="flex flex-row space-x-4 w-full h-[700px]">
                    <div className="w-4/5 h-full">
                        <ShipmentViewMap allPlaces={shipment.subShipping} />
                    </div>
                    <div className="w-1/5 h-full">
                        <h3 className="text-2xl font-medium">Important Logs</h3>
                        <ScrollArea className="w-full h-full space-y-2">
                            {tags}
                        </ScrollArea>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <h3 className="text-4xl font-medium border-b-2 p-2">Shipment Overview</h3>
                    <div className="space-y-2">
                        <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Total Quantity of coal: </h5>
                            <p className="text-xl font-medium">{shipment.quantity} in (kilo tons)</p>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Total Number of Sub-Shipment </h5>
                            <p className="text-xl font-medium">{shipment.subShipping.length}</p>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <h5 className="opacity-60">Dates</h5>
                            <p className="text-xl font-medium">{moment(Date(shipment.startDate)).format("MMM Do YY")} - {moment(Date(shipment.startDate)).format("MMM Do YY")}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between relative my-5 '>
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <h5 className='font-bold'>Origin</h5>
                                <PlaceCard place={shipment.subShipping[0].origin.place} />
                            </div>
                            <div className="w-[100%] text-center">
                                <h1>To</h1>
                                <Progress value={shipment.status === 'completed' ? 100 : 10} className="w-[100%] -z-10 " />
                            </div>

                            <div className="space-y-2">
                                <h5 className='font-bold'>Destination</h5>
                                <PlaceCard place={shipment.subShipping[shipment.subShipping.length - 1].destination.place} />
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
                                    <StepperComp origin={shipment.origin} destination={shipment.destination} status={shipment.status} distanceAndDuration={shipment.direction.distanceAndDuration} />
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