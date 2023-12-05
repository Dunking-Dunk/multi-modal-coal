import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import Loader from './Loader'

import { createVehicle } from '../store/reducer/VehicleReducer'


const BusForm = ({ update }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const FormSchema = z.object({
        make: z.string().min(2, {
            message: "Vehicle Make must be at least 2 characters.",
        }),
        model: z.string().min(2, {
            message: "Vehicle Model must be at least 2 characters.",
        }),
        registerNumber: z.string().min(3, {
            message: "Bus set must be at least 3 characters."
        }),
        capacity: z.number(),
        type: z.enum(["truck", "wagon", "ship"], {
            required_error: "You need to select a notification type.",
        }),
        status: z.boolean().default(false),
        trackerId: z.string().min(2, {
            message: "Vehicle Make must be at least 2 characters.",
        })
    })

    const form = useForm(
        {
            resolver: zodResolver(FormSchema),
            defaultValues: {
                make: '',
                model: '',
                registerNumber: '',
                capacity: 0,
                type: '',
                status: false,
                trackerId: ''
            }
        }
    )

    const onSubmit = async (data) => {
        dispatch(createVehicle(data)).then((state) => {
            console.log(state)
            if (!state.error) {
                form.reset()
                toast({
                    title: "Vehicle Created",
                    description: `${data.type} is Created`
                })
            }
        })
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
                <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Vehicle Make</FormLabel>
                            <FormControl>
                                <Input placeholder="Vehicle Make" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Vehicle Model</FormLabel>
                            <FormControl>
                                <Input placeholder="Vehicle Model" {...field} />
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
                            <FormLabel>Vehicle Mode</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="truck" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Truck
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="wagon" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Wagon
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="ship" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Ship</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="registerNumber"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Vehicle Registration Number</FormLabel>
                            <FormControl>
                                <Input placeholder="registerNumber" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Vehicle Capacity (in kilo tons)</FormLabel>
                            <FormControl>
                                <Input placeholder="Vehicle Capacity"  {...field} onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
                                    <Label htmlFor="airplane-mode">Active</Label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='space-y-4'>
                    <FormDescription>Enter the Tracker ID associated with the iot module</FormDescription>
                    <FormField
                        control={form.control}
                        name="trackerId"
                        render={({ field }) => (
                            <FormItem className='w-3/6'>
                                <FormLabel>Tracker ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tracker ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className='w-3/6'>Create</Button>
            </form>
        </Form>
    )
}

export default BusForm