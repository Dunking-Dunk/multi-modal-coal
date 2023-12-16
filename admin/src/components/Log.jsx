import React from "react";
import moment from "moment";

import { Button } from '@/components/ui/button';
import { Link, useNavigate } from "react-router-dom";

const Log = ({ log }) => {
    const navigate = useNavigate()

    return (
        <div className="p-4 border-2 rounded-xl my-2">
            <p className="text-lg mb-2">{log.message}</p>
            <div className="space-x-2">
                {log.reference.map((ref) => {

                    if (ref.ref) {
                        return <Link
                            to={`/${ref.ref}/${ref.id}`}
                            className="underline" key={ref._id}>{ref.ref}</Link>
                    }
                })}
            </div>

            <p className="opacity-60 text-sm">{moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
    )
}

export default Log;