import './App.css'
import React,{ useEffect, useState,Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { login ,logout} from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

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
