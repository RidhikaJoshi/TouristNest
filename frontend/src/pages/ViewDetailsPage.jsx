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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'


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
    const { toast } = useToast();
    const [OwnerName, setOwnerName] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [rating, setRating] = React.useState("5 star");
    const [reviews, setReviews] = React.useState([]);



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


                const rese= await axios.get(`${config.BASE_URL}/api/v1/users/${response.data.data.owner}`);
                console.log("owner:", rese.data.data.fullName);
                setOwnerName(rese.data.data.fullName);

                const reviewres=await axios.get(`${config.BASE_URL}/api/v1/reviews/${hotelId}`);
                console.log("reviewres:", reviewres.data.data);
                setReviews(reviewres.data.data);

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
             toast({
          description: "Your Hotel Listing has been deleted.",
        })
            navigate('/');
           
        } catch (error) {
            console.error('Error fetching hotel:', error);
            toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
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
            toast({
          description: "Your Hotel Details has been updated.",
        })
            navigate(`/hotels/${hotelId}`);
        } catch (error) {
            console.error('Error fetching hotel:', error);
            setSaving("Save Changes");
            toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
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
             toast({
          description: "Your Hotel Picture has been updated.",
        })
            navigate(`/hotels/${hotelId}`);
        } catch (error) {
            console.error('Error fetching hotel:', error);
            setSaving("Save Changes");
            toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        }
    };


    const handleAddReview = async (e) => {
        e.preventDefault();
        console.log("comment:", comment);
        console.log("rating:", rating);
        try {
            const response = await axios.post(`${config.BASE_URL}/api/v1/reviews/${hotelId}`,
                {
                    content: comment,
                    rating: rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentUserId?.accessToken}`,
                    },
                }
            );
            console.log("hotel:", response.data.data);
            setHotel(response.data.data);
            setComment("");
            setRating("");
            toast({
          description: "Your Review has been added.",
        })
            navigate(`/hotels/${hotelId}`);
        } catch (error) {
            console.error('Error fetching hotel:', error);
            toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        setComment("");
        setRating("");
        }
    }


return (
    <div className="w-full flex items-center justify-center">
        <div className="md:w-[60%] w-full  p-4 flex flex-col gap-5 text-l">
            {Object.keys(hotel).length > 0 ? (
                <>
                    <img src={picture} alt={name} className="w-full h-96" />
                    <h1 className="md:text-4xl text-3xl font-bold mt-4">{name}</h1>
                    <p className="text-slate-900">{description}</p>
                    <div className='flex flex-row gap-3 '>
                 
                        <button  className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-1 px-3 rounded-full shadow-md hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transform hover:scale-105 transition duration-300 ease-in-out">
  {tags}
</button>
                </div>
                    <p className="text-slate-900 font-semibold">Owner of the Hotel:  {OwnerName}</p>
                    <p className="text-slate-900 font-semibold">Price per Night:  {price}</p>
                    <p className="text-slate-900 font-semibold" >Location: {location}</p>
                    <p className="text-slate-900 font-semibold">State: {state}</p>
                    <p className="text-slate-900 font-semibold">Country: {country}</p>
                    {
                        owner === currentUserId.user._id ? (
                            <div className='flex flex-row flex-wrap gap-10'>

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
                                        <div className="flex flex-col space-y-2">
                                            <Label htmlFor="name">Tags</Label>
                                            <select name="status" className='h-10 italic outline-none p-2' value={tagsUpdated} 
                                            onChange={(e)=>setTagsUpdated(e.target.value)} required>
                                                <option value="5 star">5 star</option>
                                                <option value="4 star">4 star</option>
                                                <option value="3 star">3 star</option>
                                                <option value="2 star">2 star</option>
                                                <option value="1 star">1 star</option>
                                            </select></div>
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
                            <Button ><Link to={`/bookings/${hotel._id}`}>Book Now</Link></Button>
                        )
                    }

                    {/* // review section */}
                    <form>
                        <h3 className='text-xl font-semibold mt-3 mb-3'>Add Reviews</h3>
                        <div className="grid w-[50%] items-center gap-5">
                            <div className="flex flex-col space-y-1.5">
                            <Label >Comments</Label>
                            <Input id="name" placeholder="Enter your Comment"  value={comment} onChange={(e)=>setComment(e.target.value)}required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label >Ratings</Label>
                            <select name="status" className='h-10 italic outline-none p-2' value={rating} 
                                onChange={(e)=>setRating(e.target.value)} required>
                                    <option value="5 star">5 star</option>
                                    <option value="4 star">4 star</option>
                                    <option value="3 star">3 star</option>
                                    <option value="2 star">2 star</option>
                                    <option value="1 star">1 star</option>
                                </select>
                            </div>
                            
                        </div>
                        <Button onClick={handleAddReview}>Add Reviews</Button>
                    </form>

                    <h3 className='text-xl font-semibold mt-3 mb-3'>Reviews</h3>
                    <div className='flex flex-col gap-3'>
                        {reviews && reviews.length>0?   reviews.map((review) => (
                            <div className='flex flex-row gap-4'>
                                <p className='text-sm'><Sparkles /></p>
                                <p className='md:text-lg text-sm'>Content: {review.content}</p>
                                <p className='md:text-lg text-sm'>Rating: {review.rating}</p>
                            </div>
                        )): <p>No Reviews Yet</p>}
                    </div>
                     
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
)
}

export default ViewDetailsPage