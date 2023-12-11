import React from "react";
import { Routes, Route } from 'react-router-dom'

import Dashboard from "./Dashboard";
import PlaceHeader from "../../components/PlaceHeader";
import CreatePlace from "./CreatePlace";
import UpdatePlace from './UpdatePlace'
import ViewPlace from "./ViewPlace";

import Mines from "./Mines";
import Inventory from "./Inventory";
import Railyard from "./Railyard";
import Port from "./Port";
import CreateRoute from "./CreateRoute";
import { getAllRailroute } from "../../store/reducer/PlaceReducer";


const Place = () => {

    return (
        <>
            <PlaceHeader />
            <Routes>
                <Route element={<Dashboard />} path='/' />
                <Route element={<ViewPlace />} path='/:id' />
                <Route element={<CreatePlace />} path='/create' />
                <Route element={<Mines />} path='/mines' />
                <Route element={<Inventory />} path='/inventory' />
                <Route element={<Railyard />} path='/railyard' />
                <Route element={<Port />} path='/port' />
                <Route element={<CreateRoute />} path="/route" />
                <Route element={<UpdatePlace />} path='/update/:id' />
            </Routes>
        </>

    )
}

export default Place;
