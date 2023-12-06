import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavigationLink from "./NavigationLink";

const PlaceHeader = () => {
    return (
        <div className="w-full flex justify-center mb-4">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/places' className='text-xl'>
                            All
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='mines'>
                            <NavigationMenuTrigger className='text-inherit text-xl' >Mines</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'mines'} >View All Mines</NavigationLink>
                                <NavigationLink href={'mines?manage=true'}>Manage</NavigationLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='inventory' className='text-xl'>
                            <NavigationMenuTrigger className='text-xl'>Inventory</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'inventory'} >View All Inventory</NavigationLink>
                                <NavigationLink href={'inventory?manage=true'}>Manage</NavigationLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='railyard' className='text-xl'>
                            <NavigationMenuTrigger className='text-xl'>Railyard</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'railyard'} >View All Railyards</NavigationLink>
                                <NavigationLink href={'railyard?manage=true'}>Manage</NavigationLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='port' className='text-xl'>
                            <NavigationMenuTrigger className='text-xl'>Port</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'port'} >View All Ports</NavigationLink>
                                <NavigationLink href={'port?manage=true'}>Manage</NavigationLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default PlaceHeader;
