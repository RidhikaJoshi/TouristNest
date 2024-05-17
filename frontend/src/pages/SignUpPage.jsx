import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState();
    const [password, setPassword] = useState('');
    const [SignUp, setSignUp] = useState('Create Account');
    const dispatch = useDispatch();
    const navigate = useNavigate();

      const SignUpHandler=async(e)=>{
        e.preventDefault;
        setSignUp('Signing Up...');
        if(!username || !fullName || !phone || !email || !profilePicture || !password){
          alert('Please fill in all fields');
          setUsername('');
          setFullName('');
          setPhone('');
          setEmail('');
          setProfilePicture();
          setPassword('');
          setSignUp('SignUp');
          return;
        }
        try{
          const response=await axios.post("http://localhost:4000/api/v1/users/register",{username,fullName,phone,email,profilePicture,password});
          dispatch(login({userData:response.data}));
          navigate('/');
      }catch(error)
      {
        console.log(error);
        setEmail('');
        setPassword('');
        setSignUp('Create Account');
      }
    }


  return (
   <div className='w-full min-h-96 mt-3 mb-3 flex items-center justify-center'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create your Account</CardTitle>
        <CardDescription>Securely create your account now.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label >Username</Label>
              <Input id="name" placeholder="Enter your Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label >FullName</Label>
              <Input id="name" placeholder="Enter your Username" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label >Email</Label>
              <Input id="name" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label >Phone</Label>
              <Input id="name" placeholder="Enter your Email" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label >Profile Picture</Label>
              <Input type="file" placeholder="Enter your profile picture" value={profilePicture} onChange={(e)=>setProfilePicture(e.target.value)} required />
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label >Password</Label>
              <Input id="name" type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={SignUpHandler}>{SignUp}</Button>
      </CardFooter> 
    </Card>
    </div>

  )
}

export default SignUpPage