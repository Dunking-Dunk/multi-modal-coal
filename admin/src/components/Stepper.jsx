import * as React from 'react'
import { Progress } from "@/components/ui/progress"

import PlaceCard from "@/components/PlaceCard";

function StepperComp({ origin, destination, status }) {

    return (
        <div className='flex flex-col justify-between relative my-5 '>
            <div className="flex justify-between items-center relative">
                <div className="space-y-2">
                    <h5 className='font-bold'>Origin</h5>
                    <PlaceCard place={origin.place} />
                </div>
                <div className='w-[100%] text-center'>
                    <h1>To</h1>
                    <Progress value={status === 'completed' ? 100 : 10} className="w-[100%] -z-10 " />
                </div>
                <div className="space-y-2">
                    <h5 className='font-bold'>Destination</h5>
                    <PlaceCard place={destination.place} />
                </div>
            </div>
        </div>
    )
}

export default StepperComp