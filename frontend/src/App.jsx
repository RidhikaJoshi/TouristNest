import './App.css'
import React,{ useEffect, useState,Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { login ,logout} from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ReactLoading from 'react-loading';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const dispatch = useDispatch();
    const [loading,setLoading]=useState(true);

    useEffect(() => {
 AOS.init({
 duration: 1000, // Global animation duration
 once: true, // Only once animation
 });
 }, []);
 
  useEffect(() => {
    const checkLoggedIn = () => {
      let userLoggedIn = localStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
        // Parse user data from localStorage and dispatch login action
        const userData = JSON.parse(localStorage.getItem('userData'));
        dispatch(login({ userData }));
      } else {
        // Handle case where user is not logged in
        console.error('User not logged in.');
        dispatch(logout());
      }
    };

    checkLoggedIn();
    setLoading(false); // Set loading to false once user authentication check is done
  }, [dispatch]);

if (loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-green-100 ">
        <ReactLoading type="spin" color='green' height={'20%'} width={'20%'} />
      </div>
    );

      return (
      
      <div className='font-serif italic h-full w-full bg-green-100'>
        <Header/>
         <div className="min-h-[85vh] flex flex-col items-center justify-center ">
      <Suspense fallback={<ReactLoading type="spin" color='green' height={'20%'} width={'20%'} />}>
        <Outlet />
        </Suspense>
        </div>
        <Footer />
      </div>
    )
}


export default App
