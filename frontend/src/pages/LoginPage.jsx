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
import config from "../config/config.js"; 
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Login, setLogin] = useState('Login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast()

    const loginHandler = async(e) => {
         e.preventDefault();
         setLogin('Logging in...');
        if(!email || !password) {
            toast({
          description: "Please fill All the Fields .",
        })
            setEmail('');
            setPassword('');
            setLogin('Login');
            return;
        }
        try{
            const response=await axios.post(`${config.BASE_URL}/api/v1/users/login`,{email,password});
            console.log("login response",response.data.data);
             dispatch(login({ userData: response.data.data }));
             localStorage.setItem('userLoggedIn', 'true');
             localStorage.setItem('userData', JSON.stringify(response.data.data));
              toast({
          description: "You are LoggedIn .",
        })
            navigate('/');
        }catch(error)
        {
          console.error('Error during login:', error);
          toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
          setEmail('');
          setPassword('');
          setLogin('Login');
        }
        
    }


  return (
   <div className='w-full min-h-96 flex items-center justify-center'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login to your Account</CardTitle>
        <CardDescription>Securely access your account now.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label >Email</Label>
              <Input id="name" placeholder="Enter your Username" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label >Password</Label>
              <Input id="name" type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Test User</Button>
        <Button onClick={loginHandler}>{Login}</Button>
      </CardFooter> 
    </Card>
    </div>

  )
}

export default LoginPage