import { Link } from "react-router-dom";
import AlertDialog from "../components/AlertDialogue";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import store from '@/store/reducer/store'
import { deleteVehicle } from "../store/reducer/VehicleReducer";
import { deleteUser } from "../store/reducer/UserReducer";

export const VehicleColumn = [{
    accessorKey: "_id",
    header: "Id",
},
{
    accessorKey: "make",
    header: 'Vehicle Make'
},
{
    accessorKey: "model",
    header: 'Vehicle Model'
},
{
    accessorKey: "registerNumber",
    header: "Vehicle Register Number",
},

{
    accessorKey: "type",
    header: "Vehicle Type",
},
{
    accessorKey: "capacity",
    header: "Total Capacity",
},
{
    accessorKey: "status",
    header: "Status",
},
{
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
        const id = row.getValue('_id');

        return (
            <div className='flex space-x-4 items-center'>
                <Link to={`/vehicle/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>View</Link>
                <Link to={`/vehicle/update/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>Update</Link>
                <AlertDialog content='The following will be permanently deleted' onClick={() => {
                    store.dispatch(deleteVehicle(id))
                }} >
                    Delete
                </AlertDialog>
            </div>
        )
    }
}]

export const userColumn = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: 'UserName'
    },
    {
        accessorKey: "image",
        header: 'Image',
        cell: ({ row }) => {
            const img = row.getValue('image')

            if (img)
                return (
                    <Avatar>
                        <AvatarImage className='object-cover' src={img.url} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                )
        }
    },
    {
        accessorKey: "contact",
        header: 'User Contact'
    },
    {
        accessorKey: "role",
        header: "User Role",
    },

    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
            const id = row.getValue('_id');

            return (
                <div className='flex space-x-4 items-center'>
                    <Link href={`/bus/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>View</Link>
                    <Link href={`/bus/update/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>Update</Link>
                    <AlertDialog content='The following will be permanently deleted'
                        onClick={() => {
                            store.dispatch(deleteUser(id))
                        }}
                    >
                        Delete
                    </AlertDialog>
                </div>
            )
        }

    }]