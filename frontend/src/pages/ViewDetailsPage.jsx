import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import config from "../config/config.js";
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


function ViewDetailsPage() {
    const hotelId = useParams().id;
    const [hotel,setHotel]=React.useState({});
    const currentUserId = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    const [nameUpadted , setNameUpdated] = React.useState("");
    const [descriptionUpdated , setDescriptionUpdated] = React.useState("");
    const [tagsUpdated , setTagsUpdated] = React.useState("");
    const [locationUpdated, setLocationUpdated]=useState("");
    const [priceUpdated, setPriceUpdated]=useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [owner, setOwner] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [picture, setPicture] = React.useState("");
    const [pictureUpdated, setPictureUpdated] = React.useState("");
    const [saving, setSaving] = React.useState("Save Changes");



    //console.log("hotelId:",hotelId);
    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('userData')); 
        //console.log("currentUserId:", currentUserId.user._id);
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/v1/hotels/${hotelId}`);
                //console.log("hotel:", response.data.data);
                setHotel(response.data.data);
                setName(response.data.data.name);
                setDescription(response.data.data.description);
                setTags(response.data.data.tags);
                setLocation(response.data.data.location);
                setPrice(response.data.data.price);
                setOwner(response.data.data.owner);
                setCountry(response.data.data.country);
                setState(response.data.data.state);
                setPicture(response.data.data.picture);

            } catch (error) {
                console.error('Error fetching hotel:', error);
            }
        };
        fetchHotel();
    }, []);

    const DeleteHotel = async () => {
        try {
            const response = await axios.delete(`${config.BASE_URL}/api/v1/hotels/${hotelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUserId?.accessToken}`,
                    },
                }
            );
           
            //console.log("hotel:", response.data.data);
            setHotel(response.data.data);
            navigate('/');
           
        } catch (error) {
            console.error('Error fetching hotel:', error);
        }
    };

    const EditHotelDetails = async (e) => {
        e.preventDefault();
        setSaving("Saving...");
        try {
            const response = await axios.patch(`${config.BASE_URL}/api/v1/hotels/${hotelId}`,
                {
                    name: nameUpadted,
                    description: descriptionUpdated,
                    tags: tagsUpdated,
                    price: priceUpdated,
                    location: locationUpdated

                },
                {
                    headers: {
                        Authorization: `Bearer ${currentUserId?.accessToken}`,
                    },
                }
            );
            console.log("hotel:", response.data.data);
            setSaving("Save Changes");
            setHotel(response.data.data);
            setName(response.data.data.name);
            setDescription(response.data.data.description);
            setTags(response.data.data.tags);
            setLocation(response.data.data.location);
            setPrice(response.data.data.price);
            setNameUpdated("");
            setDescriptionUpdated("");
            setTagsUpdated("");
            setPriceUpdated("");
            setLocationUpdated("");
            navigate(`/hotels/${hotelId}`);
        } catch (error) {
            console.error('Error fetching hotel:', error);
        }
    };

    const EditPictureHandler = async (e) => {
        e.preventDefault();
        setSaving("Saving...");
        const formData = new FormData();
        formData.append('picture', pictureUpdated);
        try {
            const response = await axios.patch(`${config.BASE_URL}/api/v1/hotels/updatedHotelsPicture/${hotelId}`, formData,
                {
                    headers: {
                         "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${currentUserId?.accessToken}`,
                    },
                }
            );
            console.log("hotel:", response.data.data);
            setSaving("Save Changes");
            setHotel(response.data.data);
            setPicture(response.data.data.picture);
            setPictureUpdated(null);
            navigate(`/hotels/${hotelId}`);
        } catch (error) {
            console.error('Error fetching hotel:', error);
        }
    };


return (
    <div className="w-full flex items-center justify-center">
        <div className="md:w-[60%] w-full  p-4 flex flex-col gap-5 text-l">
            {Object.keys(hotel).length > 0 ? (
                <>
                    <img src={picture} alt={name} className="w-full h-96" />
                    <h1 className="md:text-4xl text-3xl font-bold mt-4">{name}</h1>
                    <p className="text-slate-900">{description}</p>
                    <div className='flex flex-row gap-3 '>
                    {tags && tags.map((tag,index)=>(
                        <button key={index} className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-1 px-3 rounded-full shadow-md hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transform hover:scale-105 transition duration-300 ease-in-out">
  {tag}
</button>
                    ))}</div>
                    <p className="text-slate-900 font-semibold">Price: {price}</p>
                    <p className="text-slate-900 font-semibold" >Location:{location}</p>
                    <p className="text-slate-900 font-semibold">State:{state}</p>
                    <p className="text-slate-900 font-semibold">Country:{country}</p>
                    {
                        owner === currentUserId.user._id ? (
                            <div className='flex flex-row gap-10'>

                                {/* // Edit Hotel Details */}
                                <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='border-black border-2'>Edit Hotel Details</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Edit Hotel Details</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your Hotel Details here. Click save when you're done.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                type="text"
                                                id="name"
                                                value={nameUpadted}
                                                onChange={(e) => setNameUpdated(e.target.value)}
                                            />
                                            </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Input
                                                type="text"
                                                id="description"
                                                value={descriptionUpdated}
                                                onChange={(e) => setDescriptionUpdated(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="tags">Tags</Label>
                                            <Input
                                                type="text"
                                                id="tags"
                                                value={tagsUpdated}
                                                onChange={(e) => setTagsUpdated(e.target.value)}
                                            /></div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                type="text"
                                                id="price"
                                                value={priceUpdated}
                                                onChange={(e) => setPriceUpdated(e.target.value)}
                                            /></div>
                                       
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                type="text"
                                                id="location"
                                                value={locationUpdated}
                                                onChange={(e) => setLocationUpdated(e.target.value)}
                                            /></div>

                                    </div>
                                    <DialogFooter>
                                    <Button  onClick={EditHotelDetails}>{saving}</Button>
                                    </DialogFooter>
                                </DialogContent>
                                </Dialog>

                                {/* Edit Hotel Picture */}
                                <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='border-black border-2'>Edit Hotel Picture</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Edit Hotel Picture</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your Hotel Picture here. Click save when you're done.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex flex-col gap-2">
                                           <Label htmlFor="name" >Picture</Label>
                                            <Input id="name" type="file" accept="image/gif, image/jpeg, image/png" onChange={(e) => setPictureUpdated(e.target.files[0])
                                            }className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                    <Button  onClick={EditPictureHandler}>{saving}</Button>
                                    </DialogFooter>
                                </DialogContent>
                                </Dialog>


                                {/* // delete hotel details */}
                                <Drawer>
                                    <DrawerTrigger className='border-black border-2 rounded-sm px-2'>Delete</DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerFooter>
                                        <Button onClick={DeleteHotel}>Delete Hotel</Button>
                                        <DrawerClose>
                                            <Button variant="outline">Cancel</Button>
                                        </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                    </Drawer>


                                

                            </div>
                        ) : (
                            <Button>Book Now</Button>
                        )
                    }
                     
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
)
}

export default ViewDetailsPage