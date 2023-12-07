import React from "react";
import { useParams } from 'react-router-dom'

import PlaceForm from "../../components/PlaceForm";
const UpdatePlace = () => {
    const { id } = useParams()

    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold mb-8">Update Place</h1>
            <PlaceForm update={id} />
        </div>
    )
}

export default UpdatePlace;
