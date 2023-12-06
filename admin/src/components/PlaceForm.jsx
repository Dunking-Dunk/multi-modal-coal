import React from 'react';
import { useDispatch } from 'react-redux';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

import { createPlace } from '../store/reducer/PlaceReducer';

const PlaceSchema = z.object({
    name: z.string().min(2, {
        message: "Place Name must be at least 2 characters.",
    }),
    coalType: z.string().min(2, {
        message: "Coal Type must be at least 2 characters.",
    }),
    quantity: z.string().min(1, {
        message: "Quantity must be at least 1 character.",
    }),
    type: z.enum(["mines", "inventory", "railyard", "port"], {
        required_error: "You need to select a place type.",
    }),
    location: z.object({
        type: z.string().refine((value) => value === "Point", {
            message: "Location type must be 'Point'.",
        }),
        coordinate: z.array(z.number()).refine((value) => value.length === 2, {
            message: "Coordinate must be an array of two numbers.",
        }),
    }),
    address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
});

const PlaceForm = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(PlaceSchema),
        defaultValues: {
            name: '',
            coalType: '',
            quantity: '',
            type: 'railyard',
            location: {
                type: 'Point',
                coordinate: [0, 0],
            },
            address: '',
        },
    });

    const onSubmit = async (data) => {
        dispatch(createPlace(data)).then((state) => {
            if (!state.error) {
                toast({
                    title: "Place Created",
                    description: `${data.type} is Created`
                });
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem className='w-3/6'>
                        <FormLabel>Place Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Place Name" {...field} />
                        </FormControl>
                        <FormMessage>{errors.name?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="coalType"
                render={({ field }) => (
                    <FormItem className='w-3/6'>
                        <FormLabel>Coal Type</FormLabel>
                        <FormControl>
                            <Input placeholder="Coal Type" {...field} />
                        </FormControl>
                        <FormMessage>{errors.coalType?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="quantity"
                render={({ field }) => (
                    <FormItem className='w-3/6'>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                            <Input placeholder="Quantity" {...field} />
                        </FormControl>
                        <FormMessage>{errors.quantity?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="type"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Place Type</FormLabel>
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
                                    <FormLabel className="font-normal">
                                        Railyard
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="port" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Port</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage>{errors.type?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="location"
                render={({ field }) => (
                    <FormItem className='w-3/6'>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage>{errors.location?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="address"
                render={({ field }) => (
                    <FormItem className='w-3/6'>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage>{errors.address?.message}</FormMessage>
                    </FormItem>
                )}
            />
            <Button type="submit" className='w-3/6'>Create</Button>
        </Form>
    );
};

export default PlaceForm;
