import React from "react"

const Status = ({ active, size }) => {
    return <div className={`flex rounded-full ${active ? ' bg-green-500' : 'bg-red-500'} w-[20px] h-[20px] my-1 z-2`} />
}

export default Status
