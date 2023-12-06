import React from "react";
import { Routes, Route } from 'react-router-dom'

import Create from "./Create";
import User from "./User";

const Index = () => {
    return (
        <Routes>
            <Route element={<User />} path="/" />
            <Route element={<Create />} path="/create" />
        </Routes>
    )
}

export default Index