import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from "../../components/Loader";
import { getUser } from "../../store/reducer/UserReducer";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const ViewUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { person } = useSelector((state) => state.User)
    useEffect(() => {
        dispatch(getUser(id))
    }, [])

    if (person) {
        return (
            <div className="mt-10 w-full h-full">
                <div className="flex flex-row w-full h-full">
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="rounded-full w-[500px] h-[500px] overflow-hidden">
                            <img src={person?.image?.url} className='w-full h-full object-contain relative' />
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col space-y-4">
                        <Card>
                            <CardHeader>
                                <CardDescription>Role</CardDescription>
                                <CardTitle className='text-4xl'>{person.role}</CardTitle>
                            </CardHeader>
                            <CardHeader>
                                <CardDescription>Name</CardDescription>
                                <CardTitle>{person.name}</CardTitle>
                            </CardHeader>
                            <CardHeader>
                                <CardDescription>age</CardDescription>
                                <CardTitle>{person.age}</CardTitle>
                            </CardHeader>
                            <CardHeader>
                                <CardDescription>Contact</CardDescription>
                                <CardTitle>{person.contact}</CardTitle>
                            </CardHeader>
                            <CardHeader>
                                <CardDescription>Email</CardDescription>
                                <CardTitle>{person.email}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div >
            </div>

        )
    }
    else {
        return <div className="flex items-center justify-center">
            <Loader />
        </div>
    }

}

export default ViewUser