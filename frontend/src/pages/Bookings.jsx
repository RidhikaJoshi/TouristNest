import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import config from "../config/config.js";
import { format, set } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"




function Bookings() {
    const hotelId=useParams().id;
    console.log(hotelId);
    const currentUserId = JSON.parse(localStorage.getItem('userData'));
    const [hotelDetails,setHotelDetails]=useState();
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [numberOfRooms, setNumberOfRooms] = useState(1); // Initialize with 1 room
    const navigate = useNavigate();
     const { toast } = useToast()

  const handleChange = (event) => {
    // Ensure the number of rooms doesn't go below 1
    const newValue = Math.max(1, parseInt(event.target.value, 10));
    setNumberOfRooms(newValue);
  };
    
    useEffect(() => {
      const fetchHotel = async () => {
        try {
          const response = await axios.get(`${config.BASE_URL}/api/v1/hotels/${hotelId}`);
          console.log("hotel:", response?.data?.data);
          setHotelDetails(response?.data?.data);
        } catch (error) {
          console.error('Error fetching hotel:', error);
        }
      };
      fetchHotel();
    }, []);


    const handleBooking = async () => {
      console.log("Booking:", checkIn);
      console.log("Booking checkout:", checkOut);
      console.log("Booking rooms:", numberOfRooms);
      try{
        const response = await axios.post(`${config.BASE_URL}/api/v1/bookings/${hotelId}`, {
          checkinDate: checkIn,
          checkoutDate: checkOut,
          NumberOfRooms: numberOfRooms,
        },
      {
          headers: {
                        Authorization: `Bearer ${currentUserId?.accessToken}`,
                    },
       });
        console.log("Booking response:", response);
       toast({
          description: "Your Booking has been done.",
        })
        setCheckIn(null);
        setCheckOut(null);
        setNumberOfRooms(1);
        navigate('/');
        

      }catch(error)
      {
        console.error('Error booking hotel:', error);
        setCheckIn(null);
        setCheckOut(null);
        setNumberOfRooms(1);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      
      }

    }

  return (
   <div className="w-full flex items-center justify-center ">
        <div className="md:w-[60%] w-full  p-4 flex flex-col gap-5 text-l items-center justify-center ">

            <h1 className="md:text-4xl text-xl font-bold mt-4">Booking: {hotelDetails?.name}</h1>
            <img src={hotelDetails?.picture} alt={hotelDetails?.name} className="w-[80%] h-60 " />
            <div className='flex flex-col gap-4 w-[80%] items-center justify-center h-60 '>
              {/* // CheckIn date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "md:w-[70%] w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : <span>Pick a CheckIn date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>


              {/* checkout Date */}
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "md:w-[70%] w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : <span>Pick a CheckIn date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              

           
           <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Number of Rooms</Label>
                <Input
        type="number"
        id="NumberOfRooms"
        placeholder="Number of Rooms"
        min="1"
        value={numberOfRooms}
        onChange={handleChange}
      />
            </div>
            <Button onClick={handleBooking} className="w-[50%]">Book</Button>
             </div>

        </div>

    </div>
  )
}

export default Bookings