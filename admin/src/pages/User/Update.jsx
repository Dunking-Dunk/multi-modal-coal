import React from "react";
import { useParams } from 'react-router-dom'

import UserForm from "../../components/UserForm";

const UpdateUser = () => {
    const { id } = useParams()

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h5 className="text-4xl font-bold mb-2">Update User</h5>
            <UserForm update={id} />
        </div>
    )
}

export default UpdateUser