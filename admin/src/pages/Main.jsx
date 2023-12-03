import React from 'react';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';

const Main = () => {
    return (
        <div className='px-12 h-full w-full'>
            <Header />
            <Routes>
                <Route element={<Dashboard />} path='/' />
            </Routes>
        </div>
    )
}

export default Main