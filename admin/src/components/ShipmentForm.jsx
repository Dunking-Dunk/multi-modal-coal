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
        deadline: z.date()
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
        console.log(data)
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
                                Starting Date of the shipment
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button onClick={() => setNumSub((state) => ([...state, {}]))}>Add Sub - Shipment</Button>
                <div className='py-4'>
                    {numSub.map((_, index) => {
                        return <ShipmentFormMap key={index} index={index} setSubShipment={setSubShipment} subShipment={subShipment} />
                    })}
                </div>
                {loading ? <Loader /> : <Button type="submit" className='w-3/6'>Create Shipment</Button>}
            </form>
        </Form>
    )
}

export default ShipmentForm