import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
import { Input } from "@/components/ui/input"
import { login } from '../store/reducer/UserReducer'
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    const FormSchema = z.object({
        email: z.string().min(3, {
            message: "Email must be at least 3 characters.",
        }),
        password: z.string().min(3, {
            message: "Email must be at least 3 characters."
        })
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    const onSubmit = async (data) => {
        dispatch(login(data)).then(state => {
            if (!state.error) {
                form.reset()
                navigate('/')
            } else {
                toast({
                    title: "error",
                    description: "Password or Email is wrong. Please try again.",
                    variant: 'destructive'
                })
            }
        })

        // console.log(user)
    }

    return (
        <div className='flex w-screen h-screen'>
            <div className='flex w-full h-full items-center justify-center flex-col gap-y-6 '>
                <h1 className='font-bold text-5xl uppercase'>Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >Sign In</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
