import './App.css'
import React,{ useEffect, useState,Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { login ,logout} from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLoggedIn =  () => {
      let userLoggedIn = localStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
          dispatch(login({ userData: JSON.parse(localStorage.getItem('userData')) }));
        } else {
          console.error('Error due to not logged in :');
          dispatch(logout());
        }
      };
    checkLoggedIn();
  }, [dispatch]);

  return (
  
   <div className='font-serif italic min-h-[100vh] w-full'>
    <Header/>
   <Suspense fallback={<div>Loading...</div>}>
    <Outlet />
    </Suspense>
    <Footer />
   </div>
  
  )
}

export default App
