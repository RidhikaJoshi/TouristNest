import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider,createHashRouter } from 'react-router-dom'
import {lazy}  from 'react'
import { Toaster } from "@/components/ui/toaster"

const HomePage = lazy(()=>import('./pages/HomePage.jsx'));
const LoginPage = lazy(()=>import('./pages/LoginPage.jsx'));
const SignUpPage = lazy(()=>import('./pages/SignUpPage.jsx'));
const MyProfilePage = lazy(()=>import('./pages/MyProfilePage.jsx'));
const ViewDetailsPage= lazy(()=>import('./pages/ViewDetailsPage.jsx'));
const AddHotelsPage = lazy(()=>import('./pages/AddHotelsPage.jsx'));
const BookingsHistory = lazy(()=>import('./pages/BookingHistory.jsx'));
const Payment = lazy(()=>import('./pages/Payment.jsx'));
const Bookings= lazy(()=>import('./pages/Bookings.jsx'));


const router = createHashRouter(
  [
    {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<HomePage/>
      },
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path:'register',
        element:<SignUpPage/>
      },
      {
        path:'profile',
        element:<MyProfilePage/>
      },
      {
        path:"hotels/:id",
        element:<ViewDetailsPage/>
      },
      {
        path:"bookingsHistory",
        element:<BookingsHistory/>
      },
      {
        path:"/bookings/:id",
        element:<Bookings/>
      },
      {
        path:"bookings/:id/payment",
        element:<Payment/>
      },
      {
        path:"addHotels",
        element:<AddHotelsPage/>
      }
    ]
  }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <RouterProvider router={router}/>
     <Toaster />
  </Provider>
  </React.StrictMode>,
   document.getElementById('root')
)
