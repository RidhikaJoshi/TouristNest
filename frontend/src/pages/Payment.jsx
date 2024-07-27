import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import config from '../config/config';
import axios from 'axios';
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
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input"



function Payment() {
  const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);
  // console.log(stripePromise);
    const user=JSON.parse(localStorage.getItem('userData'));
    //console.log(user);
    const userId=user.user._id;
    const AccessToken=user.accessToken;
    const bookingId=useParams().id;
    //console.log(bookingId);
    const [booking,setBooking]=useState();
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
      const fetchBookings = async () => {
        try{
          const response=await axios.get(`${config.BASE_URL}/api/v1/bookings/${bookingId}`,
            {
              headers: {
                Authorization: `Bearer ${AccessToken}`,
              },
            }
          );
          //console.log("response",response.data.data);
          setBooking(response.data.data);
          console.log("bookings",booking);

        }catch(error)
        {
          console.log("error occured while fetching bookings",error);
        }
       
      }
      fetchBookings();
    },[]);

    const handlePayment=async()=>{
      const stripe=await loadStripe("pk_test_51PIlhJSIY5SaXJgR5KIO8SJItBbGUh30Pa6BbP98nbgVVhdhlxwCqfuIwFwkMxySgl1U0qGHacyqARKcKcVYw5W400GctOUSEQ");
     const headers = {
      Authorization: `Bearer ${AccessToken}`,
      "Content-Type": "application/json",
    }
    console.log("Sending booking data to server:", booking);
    const response=await 
    axios.post(`${config.BASE_URL}/api/v1/bookings/${bookingId}/payment/create-checkout-session`,
    {booking,
    customerName,
    customerEmail,
    },
    {
      headers: headers,
    }
    );
    const sessionId = response.data.id;
    const result = await stripe.redirectToCheckout({ sessionId });
    if(result.error)
    {
      console.log("error occured while redirecting to checkout",result.error.message);
    }

    
  }
  return (
    <div className='w-full flex flex-wrap min-h-screen items-center justify-center'>
        <div className='md:w-[90%] w-full min-h-96 flex flex-wrap gap-5 justify-center items-center mt-7 mb-7 '>
          
          
            <Card key={booking?._id} className='h-full md:w-[40%] w-[80%] border-slate-400 border-[0.5px] flex flex-col items-center justify-center gap-2 p-3'>

              <CardHeader>
                <CardTitle className='md:text-lg text-sm'>{booking?.hotelName}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='flex flex-col gap-3'>
                  <img src={booking?.hotelPicture} alt="hotelPicture" className='w-72 h-60' />
                  <p>Check-in: {new Date(booking?.checkIn).toDateString()}</p>
                  <p>Check-out: {new Date(booking?.checkOut).toDateString()}</p>
                  <p>Number of rooms: {booking?.NumberOfRooms}</p>
                  <p>Total Amount: {booking?.totalAmount}</p>
                </CardDescription>


              </CardContent>
              <div className='flex flex-col  w-[90%] gap-2'>
              <Input type="text" value={customerName} placeholder="Enter your Name" onChange={(e) => setCustomerName(e.target.value)} required />
              <Input type="email" value={customerEmail} placeholder="Enter your Email" onChange={(e) => setCustomerEmail(e.target.value)} required />
                <Button color='primary' className='w-full' onClick={handlePayment}>
                  <Check size={20} className='mr-2' />
                  Pay Now
                </Button>
               
                  {/* <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements> */}
              </div>
              
            </Card>
         

        </div>
       
    </div>
  )
}

export default Payment