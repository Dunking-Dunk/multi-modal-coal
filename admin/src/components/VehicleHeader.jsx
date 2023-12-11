import React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import NavigationLink from "./NavigationLink";


const VehicleHeader = () => {
    return (
        <div className="w-full flex justify-center mb-4">
            <NavigationMenu>
                <NavigationMenuList >
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/vehicle' className='text-xl'>
                            All
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='truck'>
                            <NavigationMenuTrigger className='text-inherit text-xl' >Truck</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'truck'} >View All Trucks</NavigationLink>
                                <NavigationLink href={'truck?manage=true'}>Manage</NavigationLink>
                            </div>

                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='train' className='text-xl'>
                            <NavigationMenuTrigger className='text-xl text-inherit'>Train</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'train'} >View All Trains</NavigationLink>
                                <NavigationLink href={'train?manage=true'}>Manage</NavigationLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='ship' className='text-xl'>
                            <NavigationMenuTrigger className='text-xl text-inherit'>Ship</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'ship'} >View All Ships</NavigationLink>
                                <NavigationLink href={'ship?manage=true'}>Manage</NavigationLink>
                            </div>

                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default VehicleHeader