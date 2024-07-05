import React, { useEffect ,useState} from 'react'
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
import config from "../config/config.js"; 
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

function HomePage() {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
     const authStatus=useSelector((state)=>state.auth.status);

     const Images=[
        {
          id:1,
          image:"https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:2,
          image:"https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:3,
          image:"https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:4,
          image:"https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:5,
          image:"https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
     ]

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/v1/hotels/getAllHotels`);
        console.log("hotels:",response.data);
        setHotels(response.data.data);
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    }
    fetchHotels();

  }, [ ])

  return (
    <div className='w-full min-h-96 flex flex-wrap items-center justify-center p-2.5 gap-16'>

      {/* Introduction */}
      <div className='md:w-full w-[90%] min-h-96  flex md:flex-row  flex-col flex-wrap items-center justify-center gap-4 mt-4'>
        <div className='md:w-[45%] w-full min-h-40 '>
            <h2 className='md:text-2xl text-xl font-semibold text-[#16A34A]'>"Discover your perfect stay with us! Book your dream vacation at unbeatable prices. Explore top-rated hotels and enjoy seamless booking for an unforgettable experience."</h2>
        </div>
        <div className='md:w-[45%] w-[80%] min-h-40  flex items-center justify-center'>
            <Carousel className="w-full max-w-sm" opts={{align: "start",loop: true,}}  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
              <CarouselContent>
                {Images.map((image,id) => (
                  <CarouselItem key={id}>
                    <div >
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img src={image.image} alt="hotel" className="w-full h-full " />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
          </Carousel>
        </div>
        
      </div>



      {/* List of Hotels */}
    <div className='md:w-full w-[90%] min-h-96 flex flex-wrap flex-col items-center justify-center gap-5 mt-4 mb-4'>
      {/* <h1 className="text-3xl font-bold text-center">Hotels</h1> */}
      <div className='w-full flex flex-row flex-wrap items-center justify-center gap-3'>
      { hotels && hotels.map((hotel) => (
          console.log("hotel:",hotel._id),
        <Card className="w-[400px] border-[0.5px] border-[#16A34A]" key={hotel._id}>
          <CardHeader>
            <CardTitle>{hotel.name}</CardTitle>
            
          </CardHeader>
          <CardContent className=" flex flex-col gap-4">
            <div className="grid w-full items-center gap-4">
              <div>
                <img src={hotel.picture} alt={hotel.name} className="w-full h-60" />
              </div>
            </div>
            <CardDescription>{hotel.description}</CardDescription>
            
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link  to={authStatus?`/hotels/${hotel._id}`:`/login`}><Button >View Details</Button></Link>
            <Link to={authStatus?`/bookings/${hotel._id}`:`/login`}><Button >Book Now</Button></Link>
          </CardFooter>
        </Card>
      ))
      }
      </div>

    </div>


    {/* FAQs */}
    <div className='br-red-200 md:w-[60%] w-[90%] min-h-32'>
      <h1 className="text-3xl font-bold text-center">FAQs</h1>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How do I make a reservation?</AccordionTrigger>
        <AccordionContent>
          To make a reservation, simply enter your destination, check-in and check-out dates, and the number of guests into the search bar. Browse the available hotels, select your preferred option, and follow the prompts to complete your booking.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I cancel or modify my booking?</AccordionTrigger>
        <AccordionContent>
         Yes, you can cancel or modify your booking depending on the hotel's policy. Please log in to your account, go to 'My Bookings', and follow the instructions to make changes. Note that cancellation and modification fees may apply.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
        <AccordionContent>
         We accept major credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. All transactions are secure and encrypted for your protection.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    </div>
      </div> 
  )
}

export default HomePage