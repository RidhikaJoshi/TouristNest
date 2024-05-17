import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider,createHashRouter } from 'react-router-dom'
import {lazy}  from 'react'

const HomePage = lazy(()=>import('./pages/HomePage.jsx'));
const LoginPage = lazy(()=>import('./pages/LoginPage.jsx'));
const SignUpPage = lazy(()=>import('./pages/SignUpPage.jsx'));


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
      }
    ]
  }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
   document.getElementById('root')
)
