import React from "react";
import { Routes, Route } from 'react-router-dom'

import Dashboard from "./Dashboard";
import PlaceHeader from "../../components/PlaceHeader";
import CreatePlace from "./CreatePlace";
import UpdatePlace from './UpdatePlace'
import ViewPlace from "./ViewPlace";

const Place = () => {
    return (
        <>
            <PlaceHeader />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<ViewPlace />} path='/:id' />
                <Route element={<CreatePlace />} path='/create' />
                <Route element={<UpdatePlace />} path='/update/:id' />
            </Routes>
        </>

    )
}

export default Place;
