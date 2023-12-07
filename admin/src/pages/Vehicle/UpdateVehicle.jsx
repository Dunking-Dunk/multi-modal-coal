import React from "react";
import { useParams } from 'react-router-dom'

import VehicleForm from "../../components/VehicleForm";

const UpdateVehicle = () => {
    const { id } = useParams()

    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold mb-8">Update Vehicle</h1>
            <VehicleForm update={id} />
        </div>
    )
}

export default UpdateVehicle