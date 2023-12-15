import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Loader from './Loader'
import ShipmentFormMap from './map/ShipmentFormMap'
import { createShipment } from '../store/reducer/ShipmentReducer'
import { forEach } from 'lodash'


const ShipmentForm = ({ update }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { loading } = useSelector((state) => state.User)
    const [numSub, setNumSub] = useState([])
    const [subShipment, setSubShipment] = useState([])

    useEffect(() => {
        if (update) {
            dispatch(getUser(update)).then((state) => {
                const user = state.payload.user
                form.reset({
                    name: user.name,
                    email: user.email,
                    password: '',
                    contact: user.contact,
                    role: user.role,
                    age: user.age
                })
            })

        }
    }, [])

    const FormSchema = z.object({
        quantity: z.number(),
        startDate: z.date(),
    })

    const form = useForm(
        {
            resolver: zodResolver(FormSchema),
            defaultValues: {
                quantity: 0,
            }
        }
    )


    const onSubmit = (data) => {
        console.log(subShipment[subShipment.length - 1].eta)
        if (subShipment.length > 0) {
            const body = {
                ...data,
                origin: subShipment[0].origin,
                destination: subShipment[subShipment.length - 1].destination,
                subShipments: subShipment,
                eta: subShipment[subShipment.length - 1].eta,
                status: 'dispatched'
            }

            dispatch(createShipment(body)).then((state) => {
                if (!state.error) {
                    toast({
                        title: 'Created Shipment',
                        description: 'Successfully created Shipment'
                    })
                    form.reset()
                    setSubShipment([])
                    setNumSub([])
                } else {
                    toast({
                        title: 'Error',
                        description: state.payload.error.message,
                        variant: 'destructive'
                    })
                }
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Coal Quantity (in kilo tons) </FormLabel>
                            <FormControl>
                                <Input placeholder="Quantity" onChange={(e) => {
                                    field.onChange(Number(e.target.value))
                                }} type='number' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>StartDate</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Starting Date of the shipment. Enter the date to add sub-shipment
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='py-2'>
                    {numSub.map((_, index) => {
                        return <ShipmentFormMap key={index} index={index} setSubShipment={setSubShipment} subShipment={subShipment} startDate={form.getValues('startDate')} />
                    })}
                    <div className='flex flex-row justify-between'>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            setNumSub((state) => ([...state, {}]))
                        }} disabled={!((subShipment.length >= numSub.length || numSub.length === 0) && form.getValues('startDate'))}>Add Sub - Shipment</Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            setNumSub((state) => ([...state.slice(0, state.length - 1)]))
                            if (subShipment.length === numSub.length)
                                setSubShipment((state) => ([...state.slice(0, state.length - 1)]))
                        }}>remove</Button>
                    </div>

                </div>
                {loading ? <Loader /> : <Button type="submit" className='w-3/6'>Create Shipment</Button>}
            </form>
        </Form>
    )
}

export default ShipmentForm