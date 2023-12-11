import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
import { Button } from '../../components/ui/button'

const ViewUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { person } = useSelector((state) => state.User)
    useEffect(() => {
        dispatch(getUser(id))
    }, [])

    if (person) {
        return (
            <div className="mt-10 w-full h-full">
                <div className="flex flex-row w-full h-full">
                    <div className="w-1/2 flex  justify-center">
                        <div className="rounded-full w-[500px] h-[500px] overflow-hidden">
                            <img src={person?.image?.url} className='w-full h-full object-cover' />
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
                        {person.vehicle && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-2xl'>Vehicle</CardTitle>
                                    <CardDescription>Driver current assigned Vehicle</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex space-x-4 items-center mb-4">
                                        <CardTitle>Vehicle Type</CardTitle>
                                        <CardDescription className='uppercase'>{person.vehicle.type}</CardDescription>
                                    </div>
                                    <div className="flex space-x-4 items-center  mb-4">
                                        <CardTitle>Vehicle Registration Number</CardTitle>
                                        <CardDescription>{person.vehicle.registerNumber}</CardDescription>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => {
                                        navigate(`/vehicle/${person.vehicle._id}`)
                                    }}>View Vehicle</Button>
                                </CardFooter>
                            </Card>

                        )}
                        {person.supervisor && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-2xl'>Place Supervisor</CardTitle>
                                    <CardDescription>Supervisor currently assigned Place</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex space-x-4 items-center mb-4">
                                        <CardTitle>Place Type</CardTitle>
                                        <CardDescription className='uppercase'>{person.supervisor.type}</CardDescription>
                                    </div>
                                    <div className="flex space-x-4 items-center mb-4">
                                        <CardTitle>Place Name</CardTitle>
                                        <CardDescription >{person.supervisor.name}</CardDescription>
                                    </div>
                                    <div className="flex space-x-4 items-center  mb-4">
                                        <CardTitle>Address</CardTitle>
                                        <CardDescription>{person.supervisor.address}</CardDescription>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => {
                                        navigate(`/place/${person.supervisor._id}`)
                                    }}>View Place</Button>
                                </CardFooter>
                            </Card>

                        )}
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