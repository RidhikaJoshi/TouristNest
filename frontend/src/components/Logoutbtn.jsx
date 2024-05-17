import React from 'react'
import { useDispatch } from 'react-redux'
import {logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
// import {logout}  from "../../../backend/src/controllers/user.controller"

function Logoutbtn() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const logoutHandler=()=>{
    // logout().then((response)=>{
    //   console.log(response);
    //   dispatch(logout());
    //   navigate('/');
    // }).catch((error)=>{
    //   console.log(error);
    // });
    // }
  return (
    <>
    <button className='px-4 py-2 rounded-full cursor-pointer bg-[#FD356D] text-white' >Logout</button>
    </>  )
}

export default Logoutbtn