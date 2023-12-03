import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster"
import { useDispatch, useSelector } from 'react-redux';

import Login from './pages/Login';
import Main from './pages/Main';
import { currentUser } from './store/reducer/UserReducer';


function App() {
  const { user } = useSelector((state) => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(currentUser())
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <Routes>
        {user ?
          <Route element={<Main />} path='*' /> :
          <Route element={<Login />} path='/login' />
        }
      </Routes>
      <Toaster />
    </>

  );
}

export default App;
