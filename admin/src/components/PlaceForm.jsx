import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import LocationPicker from './map/LocationPicker';
import { createPlace, getPlace, updatePlace } from '../store/reducer/PlaceReducer';
import { Combobox } from './ComboBox';
import Loader from '../components/Loader'

const PlaceForm = ({ update }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [coords, setCoords] = useState({
        lat: 0,
        lng: 0
    })
    const [address, setAddress] = useState({})
    const { loading } = useSelector((state) => state.Vehicle)
    const { supervisors } = useSelector((state) => state.User)
    const supervisorsModified = supervisors.map((supervisor) => ({ label: supervisor.name, value: supervisor._id }))

    useEffect(() => {
        if (update) {
            dispatch(getPlace(update)).then((state) => {
                const place = state.payload.place

                setCoords({ lat: place.location.coordinate[1], lng: place.location.coordinate[0] })
                form.reset({
                    name: place.name,
                    coalStored: place.coalStored,
                    type: place.type,
                    address: place.address,
                    supervisor: place.supervisor._id,
                    state: place.state
                })
            }, [])
        }

    }, [])


    const PlaceSchema = z.object({
        name: z.string().min(2, {
            message: "Place Name must be at least 2 characters.",
        }),
        coalStored: z.number(),
        type: z.enum(["mines", "inventory", "railyard", "port"], {
            required_error: "You need to select a place type.",
        }),
        address: z.string().min(6, {
            message: "Address must be at least 6 characters.",
        }),
        state: z.string().min(2, {
            message: "State must be at least 2 characters.",
        }),
        supervisor: z.string()
    });

    const form = useForm({
        resolver: zodResolver(PlaceSchema),
        defaultValues: {
            name: '',
            coalStored: '',
            type: 'railyard',
            address: '',
            supervisor: '',
            state: ''
        },
    });

    const onSubmit = async (data) => {
        if (update) {
            dispatch(updatePlace({
                data: {
                    ...data,
                    placeId: address.placeId,
                    location: {
                        type: 'Point',
                        coordinate: [coords.lng, coords.lat]
                    }
                }, id: update
            })).then((state) => {

                if (!state.error) {
                    form.reset()
                    toast({
                        title: "Vehicle Updated",
                        description: `${data.type} is Updated`
                    })
                } else {
                    toast({
                        title: 'Error',
                        description: state.payload.error.message,
                        variant: 'destructive'
                    })
                }
            })
        } else {
            dispatch(createPlace({
                ...data,
                placeId: address.placeId,
                location: {
                    type: 'Point',
                    coordinate: [coords.lng, coords.lat]
                }
            })).then((state) => {
                if (!state.error) {
                    form.reset()
                    setAddress('')
                    toast({
                        title: "Place Created",
                        description: `${data.type} is Created`
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: state.payload.error.message,
                        variant: 'destructive'
                    })
                }
            });
        }

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6 ">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Place Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Place Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Coal Place</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="mines" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Mines
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="inventory" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Inventory
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="railyard" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Railyard</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="port" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Port</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coalStored"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Coal Stored (in kilo tons)</FormLabel>
                            <FormControl>
                                <Input placeholder="Coal stored in inventory"  {...field} onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {supervisors.length > 0 && (
                    <FormField
                        control={form.control}
                        name="supervisor"
                        render={({ field }) => (
                            <FormItem className="space-x-4 w-3/6">
                                <FormLabel>Supervisor</FormLabel>
                                <FormControl>
                                    <Combobox list={supervisorsModified} title='supervisor' onChange={field.onChange} defaultValue={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <div className='w-full h-[600px] flex flex-col space-y-2'>
                    <FormLabel>Location</FormLabel>
                    <FormDescription >Mark the pointer to the location of the place</FormDescription>
                    <LocationPicker getAddress={setAddress} setCoords={setCoords} coords={coords} />
                </div>
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="Coal stored in inventory"  {...field} value={address.state} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Place Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type your message here." {...field} value={address.address} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {loading ? <Loader /> : <Button type="submit" className='w-3/6'>{update ? 'Update' : 'Create'}</Button>}

            </form>
        </Form>
    )
};

export default PlaceForm;
