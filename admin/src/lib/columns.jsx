import { Link } from "react-router-dom";
import AlertDialog from "../components/AlertDialogue";

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
                <Link href={`/bus/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>View</Link>
                <Link href={`/bus/update/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>Update</Link>
                <AlertDialog content='The following will be permanently deleted' >
                    Delete
                </AlertDialog>
            </div>
        )
    }
}]