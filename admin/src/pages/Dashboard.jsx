import React, { useEffect }  from "react"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeatMap from "../components/Visual/HeatMap";
import Table from '../components/DataTable'
import { ShippingColumn,ShippingColDash } from "../lib/columns";
import { useSelector, useDispatch } from "react-redux";
import { Linegraph } from "../components/Visual/Linegraph";
import { Bargraph } from "../components/Visual/Bargraph";
import { getAllSubShipments } from "../store/reducer/ShipmentReducer";
import AllShipmentsMap from '../components/map/AllShipments';
import AllVehicleView from "../components/map/allVehicles";



const Dashboard = () => {
  const { shipments, subShipments } = useSelector((state) => state.Shipment)
  const dispatch = useDispatch()
  const { vehicles, trains } = useSelector((state) => state.Vehicle)

  useEffect(() => {
      dispatch(getAllSubShipments())
  }, [])
    return(
        
      <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs className="space-y-4">
        <TabsContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Shipments
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Overall Shipments From Last Month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Live Coal Cost
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">INR 11,594</div>
                <p className="text-xs text-muted-foreground">
                  per MT for coal 5,500 kcal
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicles.length}</div>
                <p className="text-xs text-muted-foreground">
                  Road, Rail, Inland & Coastal
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quantity Shipped
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4460</div>
                <p className="text-xs text-muted-foreground">
                in Tons
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-9">
            <Card className="col-span-3">
            <CardHeader>
            <CardTitle>State-wise Distribution</CardTitle>
            {/* <CardDescription>
                  Brief Chloropleth map of the shipment involvement is displayed.
                </CardDescription> */}
            </CardHeader>
            <CardContent >
            <div className="w-full h-[400px]">
            <HeatMap />
            </div>   
             </CardContent>   
            </Card>
            <Card className="col-span-6">
              <CardHeader>
                <CardTitle>Active Shipments</CardTitle>
                <CardDescription>
                  Routes of all the on-going shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
              <div className="w-full h-[400px]">
                    <AllShipmentsMap subShipments={subShipments} />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-5">
            <Bargraph/>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>
                  There was {shipments.length} shipments this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
              {shipments && <Table columns={ShippingColDash} data={shipments} />}
              </CardContent>
            </Card>
          </div>
          
        </TabsContent>
      </Tabs>
    </div>

    ) 
}

export default Dashboard;

