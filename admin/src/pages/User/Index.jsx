import React from "react";
import { Routes, Route } from 'react-router-dom'

import Create from "./Create";
import User from "./User";
import UpdateUser from "./Update";
import ViewUser from "./View";

const Index = () => {
    return (
        <Routes>
            <Route element={<User />} path="/" />
            <Route element={<ViewUser />} path="/:id" />
            <Route element={<Create />} path="/create" />
            <Route element={<UpdateUser />} path="/update/:id" />
        </Routes>
    )
}

export default Index