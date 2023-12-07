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
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/place/inventory' className='text-xl'>
                            Inventories
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/place/railyard' className='text-xl'>
                            Railyards
                        </NavigationLink>
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
