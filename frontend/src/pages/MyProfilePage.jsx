import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { current } from '@reduxjs/toolkit';
import config from "../config/config.js"; 

function MyprofilePage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || {});
    const [fullNameUpdated, setFullNameUpdated] = useState('');
    const [phoneUpdated, setPhoneUpdated] = useState('');
    const [profilePictureUpdated, setProfilePictureUpdated] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');


    useEffect(() => {
       //console.log("user",user);
        setFullName(user?.user?.fullName);
        setPhone(user?.user?.phone);
        setEmail(user?.user?.email);
        setUsername(user?.user?.username);
        setProfilePicture(user?.user?.profilePicture);
    
    }, []);

    const EditprofileDetailsHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
        const response = await axios.patch(
            `${config.BASE_URL}/api/v1/users/changeFullnamePhoneNumber`,
            { fullName: fullNameUpdated?fullNameUpdated:fullName, phone: phoneUpdated?phoneUpdated:phone },
            {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            }
        );
        //console.log(response);
        if (response.status === 200) {
            // Update profile details in the state
            setFullName(fullNameUpdated?fullNameUpdated:fullName);
            setPhone(phoneUpdated?phoneUpdated:phone);
            setFullNameUpdated('');
            setPhoneUpdated('');
            alert('Profile details updated successfully');

            // Update profile details in local storage
            const updatedUser = { ...user };
            console.log("updatedUser",updatedUser)
            updatedUser.user.fullName = fullNameUpdated?fullNameUpdated:fullName;
            updatedUser.user.phone = phoneUpdated?phoneUpdated:phone;
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    } catch (error) {
        console.error(error);
    }
};
    const EditPictureHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePictureUpdated);
            const response = await axios.patch(
                "http://localhost:4000/api/v1/users/changeProfilePicture",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            //console.log("response",response.data);
            if (response.status === 200) {
                // Update profile picture in state and local storage
                const updatedUser = { ...user };
                updatedUser.user.profilePicture = response.data?.data?.profilePicture || profilePicture;
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setProfilePicture(profilePictureUpdated ? profilePictureUpdated : profilePicture);
                setProfilePictureUpdated('');
                alert('Profile picture updated successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const ChangePasswordHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.patch(
                "http://localhost:4000/api/v1/users/changeCurrentPassword",
                { currentPassword: currentPassword, newPassword: newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                // Update profile details in the state
                setCurrentPassword('');
                setNewPassword('');
                alert('Password changed successfully');
            }
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div className='min-h-screen mt-5 text-black'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='text-4xl font-bold'>My Profile</h1>
                <p className='text-lg'>Welcome to your profile page</p>
            
                <Avatar className="h-20 w-20">
                    <AvatarImage src={profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-3'>
                    <p className='text-lg'>Name: {fullName}</p>
                    <p className='text-lg'>Email: {email}</p>
                    <p className='text-lg'>Username: {username}</p>
                    <p className='text-lg'>Phone: {phone}</p>
                </div>
                <div className='flex flex-row gap-2 flex-wrap'>
                    {/* // Sheet component to edit profile details */}
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

                    {/* // updating the profile picture */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Edit Profile Picture</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>Edit profile picture</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Picture
                                    </Label>
                                    <Input id="name" type="file" accept="image/gif, image/jpeg, image/png" onChange={(e) => setProfilePictureUpdated(e.target.files[0])
                                    }className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button  onClick={EditPictureHandler}>Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
                {/* // changing current password */}
                <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Change Current Password</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>Change Password</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Current Password
                                    </Label>
                                    <Input id="name" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                         New Password
                                    </Label>
                                    <Input id="username" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button  onClick={ChangePasswordHandler}>Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    
            </div>
        </div>
    );
}

export default MyprofilePage;
