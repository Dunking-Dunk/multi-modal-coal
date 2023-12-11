import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import NavigationLink from "./NavigationLink"
import DarkBtn from './DarkMode'
import { logout } from '../store/reducer/UserReducer'

export default function Header({ props }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="w-full mb-5 border-b-2 border-primary-foreground">
            <div className="flex flex-row justify-between h-20 w-full ">
                <nav
                    className={cn("flex items-center space-x-4 lg:space-x-10")}
                    {...props}
                >
                    <NavigationLink href="/">Dashboard</NavigationLink>
                    <NavigationLink href='/shipping'>Shipment</NavigationLink>
                    <NavigationLink href="/vehicle">Vehicle</NavigationLink>
                    <NavigationLink href="/user">User</NavigationLink>
                    <NavigationLink href='/place'>Place</NavigationLink>
                    {/* <NavigationLink href='/announcement'>Announcement</NavigationLink>
                    <NavigationLink href='/notification'>Notifications</NavigationLink> */}
                </nav>
                <div className="flex items-center content-center flex-row  gap-x-6">
                    <DarkBtn />
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>

                            <div className="space-x-4 flex items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>Hursun</p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-20">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button variant="destructive" className='w-full' onClick={onLogout}>Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}