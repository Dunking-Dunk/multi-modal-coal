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

    const liveImgBackground = {
            background: 'radial-gradient(circle at 1.8% 4.8%, rgb(17, 23, 58) 0%, rgb(58, 85, 148) 90%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          };

    
    const glassBackgroundStyles = {
        background: 'rgba(255, 255, 255, 0.1)', 
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', 
        backdropFilter: 'blur(8px)', 
        WebkitBackdropFilter: 'blur(8px)', 
        borderRadius: '10px', 
        border: '1px solid rgba(255, 255, 255, 0.18)', 
      };

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
            <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 overflow-hidden" style={glassBackgroundStyles}>
            <div className="left flex flex-col justify-evenly" style={liveImgBackground}>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                    <section className='w-3/4 mx-auto flex flex-col gap-10'>
                    <div className="title">
                        <h1 className='text-white-800 text-4xl py-4'>Login</h1>
                        <p className='w-3/4 mx-auto text-gray-400'>Enter your admin login details</p>
                    </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl className='flex flex-col items-center'>
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



                
                </section>    
                    </div>
                </div>
            </div>
            
        </div>
    )
}
