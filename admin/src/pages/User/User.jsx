import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import DataTable from "../../components/DataTable";

import { useSelector } from "react-redux";
import { userColumn } from "../../lib/columns";

const User = () => {
    const { users } = useSelector((state) => state.User)

    return (
        <div className="flex flex-col gap-y-4 w-full h-full">
            <div className="flex flex-row justify-between border-b-2 py-4">
                <h5 className="text-2xl">Create User</h5>
                <Button className='w-1/6 py-0 px-0'>
                    <Link to='create' className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
                </Button>
            </div>
            <DataTable columns={userColumn} data={users} filterColumn={'name'} />
        </div>
    )
}

export default User