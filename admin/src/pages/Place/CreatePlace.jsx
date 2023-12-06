import React from "react";
import PlaceForm from "../../components/PlaceForm";
import { useParams } from "react-router-dom";

const CreatePlaces = () => {
    const { id } = useParams();

    console.log(id);

    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold mb-8">Create Place</h1>
            <PlaceForm />
        </div>
    );
};

export default CreatePlaces;
