import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const CardOverview = ({ title, Icon, value, description }) => {
    return (
        <Card className='w-full'>
            <CardHeader className='w-full flex flex-row items-center justify-between'>
                <CardTitle className='text-sm font-medium'>{title}</CardTitle>
                {Icon}
            </CardHeader>
            <CardContent>
                <h3 className='font-bold text-4xl'>{value}</h3>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}

export default CardOverview