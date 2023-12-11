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
                        <NavigationLink href='/place' className='text-xl'>
                            All
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/place/mines' className='text-xl'>
                            Mines
                        </NavigationLink>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/place/inventory' className='text-xl'>
                            Inventories
                        </NavigationLink>
                    </NavigationMenuItem> */}
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/place/railyard'>
                            <NavigationMenuTrigger className='text-inherit text-xl' > Railyards</NavigationMenuTrigger>
                        </NavigationLink>
                        <NavigationMenuContent >
                            <div className="flex flex-col space-y-2 p-4 w-[300px]">
                                <NavigationLink href={'railyard'}>All Railyard</NavigationLink>
                                <NavigationLink href={'route'} >Create Rail Route</NavigationLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/place/port' className='text-xl'>
                            Ports
                        </NavigationLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default PlaceHeader;
