import React from "react";
import { useSelector } from "react-redux";

import Table from '../../components/DataTable'
import { ShippingColumn } from "../../lib/columns";

const Manage = () => {
    const { shipments } = useSelector((state) => state.Shipment)

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">All Shipments</h1>
            {shipments && <Table columns={ShippingColumn} data={shipments} />}
        </div>
    )
}

export default Manage