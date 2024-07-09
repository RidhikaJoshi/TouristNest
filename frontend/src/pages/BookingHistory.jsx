import axios from 'axios';
import React, { useEffect } from 'react'
import config from '../config/config';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import  {Check} from "lucide-react"





function BookingHistory() {
    const user=JSON.parse(localStorage.getItem('userData'));
    console.log(user);
    const userId=user.user._id;
    const AccessToken=user.accessToken;
    //console.log(AccessToken);
    //console.log(userId);

    const [bookingId, setBookingId] = React.useState(''); 
    const [bookings, setBookings] = React.useState([]);

    useEffect(() => {
      const fetchBookings = async () => {
        try{
          const response=await axios.get(`${config.BASE_URL}/api/v1/bookings/allBookings`,
            {
              headers: {
                Authorization: `Bearer ${AccessToken}`,
              },
            }
          );
          //console.log("response",response.data.data);
          setBookings(response.data.data);
          //console.log("bookings",bookings);

        }catch(error)
        {
          console.log("error occured while fetching bookings",error);
        }
       
      }
      fetchBookings();
    },[]);
   
  return (
    <div className='w-full flex flex-wrap min-h-screen items-center justify-center'>
        <div className='md:w-[90%] w-full min-h-96 flex flex-wrap gap-5 justify-center items-center mt-7 mb-7'>

          {bookings && bookings.length>0 ?bookings.map((booking) => (
           
            <Card key={booking._id} className='h-70 w-70 border-black border-2 flex flex-col items-center justify-center'>

              <CardHeader>
                <CardTitle className='md:text-lg text-sm'>{booking.hotelName}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p>Check-in: {new Date(booking.checkIn).toDateString()}</p>
                  <p>Check-out: {new Date(booking.checkOut).toDateString()}</p>
                  <p>Number of rooms: {booking.NumberOfRooms}</p>
                  <p>Total Amount: {booking.totalAmount}</p>
                </CardDescription>
              </CardContent>
              <CardFooter className='flex flex-row gap-4'>
                <Button color='primary' className='w-full'>
                  <Check size={20} className='mr-2' />
                  Booked
                </Button>
                {/* <Button  className='w-full bg-red-500' onClick={deleteBookingHandle}>
                  <Cross size={20} className='mr-2' />
                  Cancel
                </Button> */}
              </CardFooter>
            </Card>
          )): <p>No bookings found</p>}

        </div>
       
    </div>
  )
}

export default BookingHistory