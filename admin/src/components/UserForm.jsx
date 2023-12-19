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
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Loader from './Loader'
import { createUser, getUser, updateUser } from '../store/reducer/UserReducer'


const UserForm = ({ update }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { loading } = useSelector((state) => state.User)
    const [image, setImage] = useState('')

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
        name: z.string().min(2, {
            message: "Name must be at least 3 characters.",
        }),
        email: z.string().email({
            message: 'Valid email required'
        }),
        password: z.string().min(4, {
            message: "Password must be at least 4 characters."
        }),
        contact: z.string().min(9, {
            message: "Name must be at least 9 characters.",
        }),
        role: z.enum(["admin", "supervisor", "driver"], {
            required_error: "You need to select a role type.",
        }),
        age: z.number(),
    })

    const form = useForm(
        {
            resolver: zodResolver(FormSchema),
            defaultValues: {
                name: '',
                email: '',
                password: 'lastgood',
                contact: '',
                role: 'driver',
                age: 0
            }
        }
    )


    const onFileChange = (e) => {
        const reader = new FileReader()

        reader.onload = (f) => {
            if (reader.readyState === 2) {
                setImage(reader?.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const onSubmit = async (data) => {
        if (update) {
            dispatch(updateUser({ id: update, data: { ...data, image } })).then((state) => {
                if (!state.error) {
                    form.reset()
                    toast({
                        title: 'Updated User',
                        description: 'Successfully Updated User'
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
            dispatch(createUser({ ...data, image })).then((state) => {
                if (!state.error) {
                    form.reset()
                    toast({
                        title: 'Created User',
                        description: 'Successfully created User'
                    })
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
                    name="name"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input placeholder="Age" {...field} onChange={event => field.onChange(event.target.valueAsNumber)} value={field.value} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='w-3/6'>
                    <FormLabel>Image</FormLabel>
                    <Input placeholder="Image" onChange={onFileChange} type="file" />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>User Role</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="admin" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Admin
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="supervisor" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Supervisor
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="driver" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Driver</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className='w-3/6'>
                            <FormLabel>User Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loading ? <Loader /> : <Button type="submit" className='w-3/6'>{update ? 'Update': 'Create'}</Button>}

            </form>
        </Form>
    )
}

export default UserForm