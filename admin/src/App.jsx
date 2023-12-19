import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import Login from './pages/Login';
import Main from './pages/Main';
import { currentUser } from './store/reducer/UserReducer';
import './api/socket';
import Loader from './components/Loader'
import useNotification from './components/Notification';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const { user } = useSelector((state) => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useNotification()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc',
  })

  useEffect(() => {

    dispatch(currentUser()).then((state) => {
      if (!state.payload.user && !user) {
        navigate('/login')
      }
    })

  }, [])



  if (!isLoaded) {
    return (
      <div className='w-full h-screen flex items-center justify-center'><Loader /></div>
    )
  }

  return (
    <>
      <Routes>
        {user ? <Route element={<Main />} path='*' /> :
          <Route element={<Login />} path='/login' />
        }
      </Routes>
      <Toaster />
    </>

  );
}

export default App;
