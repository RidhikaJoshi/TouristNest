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
import { useToast } from "@/components/ui/use-toast"

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
   const [signUpText, setSignUpText] = useState('Create Account');
    const navigate = useNavigate();
     const { toast } = useToast()

const signUpHandler = async (e) => {
    e.preventDefault();
    setSignUpText('Signing Up...');

    if (!username || !fullName || !phone || !email || !profilePicture || !password) {
      toast({
          description: "Please fill all the fields",
        })
      setSignUpText('Create Account');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('profilePicture', profilePicture);
    formData.append('password', password);

    try {
      const response = await axios.post(`${config.BASE_URL}/api/v1/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("signup response",response.data);
      toast({
          description: "You have successfully Signed Up.Kindly Login.",
        })
      navigate('/login');
    } catch (error) {
      console.log(error);
      setSignUpText('Create Account');
    }
  };

  return (
    <div className='w-full min-h-96 mt-3 mb-3 flex items-center justify-center'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create your Account</CardTitle>
          <CardDescription>Securely create your account now.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signUpHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Profile Picture</Label>
                <Input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  accept="image/gif, image/jpeg, image/png"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={signUpHandler}>{signUpText}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUpPage