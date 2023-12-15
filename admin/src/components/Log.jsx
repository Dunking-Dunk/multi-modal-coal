import React from "react";
import moment from "moment";

import { Button } from '@/components/ui/button';
import { Link, useNavigate } from "react-router-dom";

const Log = ({ log }) => {
    const navigate = useNavigate()

    return (
        <div className="p-4 border-2 rounded-xl my-2">
            <p className="text-lg">{log.message}</p>
            {log.reference.map((ref) => {
                if (ref.ref) {
                    return <Link onClick={() => {
                        navigate(`/${ref.ref}/${ref.id}`)
                    }} className="underline" key={ref._id}>{ref.ref}</Link>
                }
            })}
            <p className="opacity-60 text-sm">{moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
    )
}

export default Log;