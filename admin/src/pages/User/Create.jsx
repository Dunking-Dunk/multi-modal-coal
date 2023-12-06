import React from "react";
import UserForm from "../../components/UserForm";

const Create = () => {
    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <h5 className="text-4xl font-bold mb-2">Create User</h5>
            <UserForm />
        </div>
    )
}

export default Create