import React from "react";
import VehicleForm from "../../components/VehicleForm";
import { useParams } from "react-router-dom";

const CreateVehicle = () => {
    const { id } = useParams()

    console.log(id)

    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold mb-8">Create Vehicle</h1>
            <VehicleForm />
        </div>
    )
}

export default CreateVehicle