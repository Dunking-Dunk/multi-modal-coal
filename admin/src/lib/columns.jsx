import { Link } from "react-router-dom";
import AlertDialog from "../components/AlertDialogue";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

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
  cell: ({ row }) => {
    return (
      <p>{row.getValue('capacity')} (in Tons)</p>
    );
  },
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
          <Link to={`${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>View</Link>
          <Link to={`update/${id}`} className='bg-secondary  h-full py-2 px-4 rounded-lg'>Update</Link>
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

import { deletePlace } from "../store/reducer/PlaceReducer";
import { deleteShipment } from "../store/reducer/ShipmentReducer";

export const PlaceColumn = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Place Name",
  },
  {
    accessorKey: "coalStored",
    header: "Coal Stored",
    cell: ({ row }) => {
      return (
        <p>{row.getValue('coalStored')}(in Tons)</p>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Place Type",
  },
  {
    accessorKey: "supervisor.name",
    header: "Supervisor Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("_id");

      return (
        <div className="flex space-x-4 items-center">
          <Link
            to={`/place/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            View
          </Link>
          <Link
            to={`/place/update/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            Update
          </Link>
          <AlertDialog
            content="The following will be permanently deleted"
            onClick={() => {
              store.dispatch(deletePlace(id));
            }}
          >
            Delete
          </AlertDialog>
        </div>
      );
    },
  },
];

export const shippingVehicleFormColumn = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "registerNumber",
    header: "Registration Number",
  },
  {
    accessorKey: "type",
    header: "Vehicle Mode",
  },
  {
    accessorKey: "shippingStatus",
    headed: 'Shipping status'
  },
  {
    accessorKey: "capacity",
    headed: 'Vehicle Capacity'
  }
]

export const ShippingColumn = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "origin.place.name",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const place = row.getValue("destination");

      return place.place?.name ? place.place?.name : place.customPlace.name
    },
  },
  {
    accessorKey: "subShipping",
    header: "Total Number of sub-shipment",
    cell: ({ row }) => {
      const id = row.getValue("subShipping");

      return id.length
    },
  },
  {
    accessorKey: "status",
    header: "Shipment Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("_id");

      return (
        <div className="flex space-x-4 items-center">
          <Link
            to={`/shipping/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            View
          </Link>
          <Link
            to={`/place/update/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            Update
          </Link>
          <AlertDialog
            content="The following will be permanently deleted"
            onClick={() => {
              store.dispatch(deleteShipment(id));
            }}
          >
            Delete
          </AlertDialog>
        </div>
      );
    },
  },
];

export const shippingVehicleViewColumn = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "registerNumber",
    header: "Registration Number",
  },
  {
    accessorKey: "type",
    header: "Vehicle Mode",
  },
  {
    accessorKey: "shippingStatus",
    headed: 'Shipping status'
  },
  {
    accessorKey: "capacity",
    headed: 'Vehicle Capacity'
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("_id");

      return (
        <div className="flex space-x-4 items-center">
          <Link
            to={`/vehicle/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            View
          </Link>
        </div>
      );
    },
  },
]

export const vehicleShippingColumn = [
  {
    accessorKey: "shipment",
    header: "shipment Id",
  },
  {
    accessorKey: "origin.place.name",
    header: "Origin",

  },
  {
    accessorKey: "destination.place.name",
    header: "Destination",
  },
  {
    accessorKey: "status",
    header: "Shipment Status",
  },
  {
    accessorKey: "dispatch",
    header: "shipment dispatched",
  },
  {
    accessorKey: "arrived",
    header: "shipment Reached",
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("shipment");

      return (
        <div className="flex space-x-4 items-center">
          <Link
            to={`/shipping/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            View Shipment
          </Link>
        </div>
      );
    },
  },
]

export const placeShippingColumn = [
  {
    accessorKey: "shipment",
    header: "shipment Id",
  },
  {
    accessorKey: "origin.place.name",
    header: "Origin",
  },
  {
    accessorKey: "destination.place.name",
    header: "Destination",
  },
  {
    accessorKey: "status",
    header: "Shipment Status",
  },
  {
    accessorKey: "dispatch",
    header: "shipment dispatched",
  },
  {
    accessorKey: "arrived",
    header: "shipment Reached",
  },

  {
    accessorKey: "startDate",
    header: "started",
  },
  {
    accessorKey: "eta",
    header: "Estimated time of arrival",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("shipment");

      return (
        <div className="flex space-x-4 items-center">
          <Link
            to={`/shipping/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            View Shipment
          </Link>
        </div>
      );
    },
  },
]


export const ShippingColDash = [

  {
    accessorKey: "origin.place.name",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const place = row.getValue("destination");

      return place.place?.name ? place.place?.name : place.customPlace.name
    },
  },
  {
    accessorKey: "status",
    header: "Shipment Status",
  },

];