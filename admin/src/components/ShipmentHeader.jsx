import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavigationLink from "./NavigationLink";

const ShipmentHeader = () => {
    return (
        <div className="w-full flex justify-center mb-4">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/shipping' className='text-xl'>
                            Shipments
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/shipping/manage' className='text-xl'>
                            Manage
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='px-10'>
                        <NavigationLink href='/shipping/create' className='text-xl'>
                            Create
                        </NavigationLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default ShipmentHeader;
