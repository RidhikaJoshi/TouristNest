import React, { useEffect } from 'react'
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


function ViewDetailsPage() {
    const hotelId = useParams().id;
    const [hotel,setHotel]=React.useState({});
    const currentUserId = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    
    console.log("hotelId:",hotelId);
    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem('userData')); 
        //console.log("currentUserId:", currentUserId.user._id);
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/v1/hotels/${hotelId}`);
                //console.log("hotel:", response.data.data);
                setHotel(response.data.data);
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
           
            console.log("hotel:", response.data.data);
            setHotel(response.data.data);
             navigate("/");
        } catch (error) {
            console.error('Error fetching hotel:', error);
        }
    };




return (
    <div className="w-full flex items-center justify-center">
        <div className="md:w-[60%] w-full  p-4 flex flex-col gap-5 text-l">
            {Object.keys(hotel).length > 0 ? (
                <>
                    <img src={hotel.picture} alt={hotel.name} className="w-full h-96" />
                    <h1 className="md:text-4xl text-3xl font-bold mt-4">{hotel.name}</h1>
                    <p className="text-slate-900">{hotel.description}</p>
                    <div className='flex flex-row gap-3 '>
                    {hotel.tags && hotel.tags.map((tag,index)=>(
                        <button key={index} className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-1 px-3 rounded-full shadow-md hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transform hover:scale-105 transition duration-300 ease-in-out">
  {tag}
</button>
                    ))}</div>
                    <p className="text-slate-900 font-semibold">Price: {hotel.price}</p>
                    <p className="text-slate-900 font-semibold" >Location:{hotel.location}</p>
                    <p className="text-slate-900 font-semibold">State:{hotel.state}</p>
                    <p className="text-slate-900 font-semibold">Country:{hotel.country}</p>
                    {
                        hotel.owner === currentUserId.user._id ? (
                            <div className='flex flex-row gap-4 '>
                                <Button >Edit</Button>
                                <Drawer>
                                    <DrawerTrigger>Delete</DrawerTrigger>
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