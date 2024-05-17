import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function MyprofilePage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || {});
    const [fullNameUpdated, setFullNameUpdated] = useState('');
    const [phoneUpdated, setPhoneUpdated] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log(user.data.user);
        setFullName(user.data?.user?.fullName);
        setPhone(user.data?.user?.phone);
        setEmail(user.data?.user?.email);
        setUsername(user.data?.user?.username);
    }, []);

    const EditprofileDetailsHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
        const response = await axios.patch(
            "http://localhost:4000/api/v1/users/changeFullnamePhoneNumber",
            { fullName: fullNameUpdated, phone: phoneUpdated },
            {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`,
                },
            }
        );
        console.log(response);
        if (response.status === 200) {
            // Update profile details in the state
            setFullName(fullNameUpdated);
            setPhone(phoneUpdated);
            alert('Profile details updated successfully');

            // Update profile details in local storage
            const updatedUser = { ...user };
            updatedUser.data.user.fullName = fullNameUpdated;
            updatedUser.data.user.phone = phoneUpdated;
            localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
    } catch (error) {
        console.error(error);
    }
};

    return (
        <div className='min-h-screen mt-5 text-black'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='text-4xl font-bold'>My Profile</h1>
                <p className='text-lg'>Welcome to your profile page</p>
            
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.data?.user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-3'>
                    <p className='text-lg'>Name: {fullName}</p>
                    <p className='text-lg'>Email: {email}</p>
                    <p className='text-lg'>Username: {username}</p>
                    <p className='text-lg'>Phone: {phone}</p>
                </div>
                <div className='flex flex-row gap-2 flex-wrap'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Edit Profile Details</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Fullname
                                    </Label>
                                    <Input id="name" value={fullNameUpdated} onChange={(e) => setFullNameUpdated(e.target.value)} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Phone Number
                                    </Label>
                                    <Input id="username" value={phoneUpdated} onChange={(e) => setPhoneUpdated(e.target.value)} className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button  onClick={EditprofileDetailsHandler}>Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}

export default MyprofilePage;
