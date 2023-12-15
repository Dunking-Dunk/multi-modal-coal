import React from "react";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from "react-router-dom";

const PlaceCard = ({ place }) => {
    const navigate = useNavigate()

    return (
        <Card className='py-4 px-8 w-fit h-fit'>
            <h3 className="text-2xl font-semibold">{place.name}</h3>
            <p className="mb-4 opacity-60">{place.type}</p>
            <p className="text-regular mb-4 w-[300px]">{place.address.slice(0, 50)}...</p>
            {place.type !== 'others' && <Button onClick={() => navigate(`/place/${place._id}`)}>View Place</Button>}
        </Card>
    )
}

export default PlaceCard