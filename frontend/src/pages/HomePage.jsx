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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { FaStar } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton"


function HomePage() {
    const [hotels, setHotels] = useState([]);
    const [page,setPage]=useState(1);
     const authStatus=useSelector((state)=>state.auth.status);

     const Images1=[
        {
          id:1,
          image:"https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:2,
          image:"https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:3,
          image:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:4,
          image:"https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:5,
          image:"https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
     ]

     const Images2=[
        {
          id:1,
          image:"https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:2,
          image:"https://images.pexels.com/photos/895555/pexels-photo-895555.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:3,
          image:"https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:4,
          image:"https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:5,
          image:"https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
     ]


const reviews = [
  {
    user: "John D.",
    review: "TouristNest made booking my vacation so easy! The interface is super intuitive, and I found the perfect hotel within minutes. Highly recommend!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    wordCount: 22
  },
  {
    user: "Sophie B.",
    review: "TouristNest helped me find the perfect hotel for my family vacation. The website is easy to use, and the booking process was straightforward. Highly recommend!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    wordCount: 23
  },
  {
    user: "Daniel M.",
    review: "I had a great experience using TouristNest. The interface is clean and modern, and I appreciated the detailed hotel descriptions. Will definitely use it again!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    wordCount: 22
  },
  {
    user: "Jessica S.",
    review: "TouristNest made my last-minute trip planning stress-free. The search filters were helpful, and I found a great deal on a hotel in a prime location. Very satisfied!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    wordCount: 27
  },
  {
    user: "Ryan P.",
    review: "The booking process on TouristNest was quick and efficient. I appreciated the secure payment options and the variety of hotel choices available. Recommended!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    wordCount: 22
  },
  {
    user: "Olivia L.",
    review: "I found TouristNest to be very user-friendly. The interface is intuitive, and I liked being able to compare different hotels easily. Overall, a great experience.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    wordCount: 20
  },
  {
    user: "Emily R.",
    review: "I love the seamless experience TouristNest provides. From user authentication to secure payment processing with Stripe, everything works flawlessly. Great job!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    wordCount: 22
  },
  {
    user: "Michael T.",
    review: "TouristNest is a game-changer for booking hotels. The listings are comprehensive, and the booking management system is very user-friendly. Five stars!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    wordCount: 22
  },
  {
    user: "Sarah L.",
    review: "Booking through TouristNest was a breeze. The website is well-designed and easy to navigate. The secure payment integration made me feel safe with my transaction.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    wordCount: 27
  },
  {
    user: "James K.",
    review: "Fantastic service from TouristNest! The hotel options are excellent, and the booking process is quick and efficient. I'll definitely use it for my next trip.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    wordCount: 24
  }
];



  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response=await axios.get(`${config.BASE_URL}/api/v1/hotels/getAllHotels?page=${page}&limit=6`);
        //console.log("hotels:",response.data);
        setHotels(response?.data?.data);
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    }
    fetchHotels();

  }, [page])

  return (
    <div className='w-full min-h-96 flex flex-col flex-wrap items-center justify-center p-2.5 gap-16'>

      {/* Introduction1 */}
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
                {Images1.map((image,id) => (
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


    {/* Introduction2 */}
       <div className='md:w-full w-[90%] min-h-96  flex md:flex-row  flex-col-reverse flex-wrap items-center justify-center gap-4 mt-4'>
       
        <div className='md:w-[45%] w-[80%] min-h-40  flex items-center justify-center'>
            <Carousel className="w-full max-w-sm" opts={{align: "start",loop: true,}}  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
              <CarouselContent>
                {Images2.map((image,id) => (
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
         <div className='md:w-[45%] w-full min-h-40 '>
            <h2 className='md:text-2xl text-xl font-semibold text-[#16A34A]'>"Stay in style, travel in comfort. Find the best deals on hotels, from budget-friendly to luxury. Make your next getaway unforgettable with our easy booking process."</h2>
        </div>
        
      </div>
              


              
      {/* List of Hotels */}
    <div className='md:w-full w-[90%] min-h-96 flex flex-wrap flex-col items-center justify-center gap-5 mt-4 mb-4'>
      {/* <h1 className="text-3xl font-bold text-center">Hotels</h1> */}
      <div className='w-full flex flex-row flex-wrap items-center justify-center gap-3'>
      { hotels.length === 0 ? [1, 2, 3, 4, 5, 6].map((n) => (
        <Card className="w-[400px] border-[0.5px] border-[#16A34A]" key={n}>
          <CardHeader>
            <CardTitle><Skeleton/></CardTitle>
          </CardHeader>
          <CardContent className=" flex flex-col gap-4">
            <div className="grid w-full items-center gap-4">
              <div>
                <Skeleton className="w-full h-60" />
              </div>
            </div>
            <CardDescription><Skeleton count={3}/></CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button disabled><Skeleton/></Button>
            <Button disabled><Skeleton/></Button>
          </CardFooter>
        </Card>
      ))
      
      
      
      
      : 
      hotels.map((hotel) => (
          //console.log("hotel:",hotel._id),
        <Card className="w-[400px] border-[0.5px] border-[#16A34A]" key={hotel._id}>
          <CardHeader>
            <CardTitle>{hotel?hotel.name :<Skeleton/>}</CardTitle>
            
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

    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={() => {
            setPage(page - 1>0?page-1:1);
            
          }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => {
            setPage(1);
          }} >1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick= {()=>{setPage(2);
         }
          } >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick= {()=>{setPage(3);
          }
          }>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick= {()=>setPage(page+1<=3?page+1:3)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>


    {/* Reviews Section */}
    <div className='min-h-60 md:w-[80%] w-[60%] flex flex-wrap items-center justify-center'>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-2xl"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/3 ">
                <div>
                  <Card>
                    <CardContent className="md:h-60 h-72 flex flex-col items-center justify-center p-3 text-center gap-3  bg-black rounded">
                      <div className='flex flex-row gap-3 items-center justify-center'>
                      <Avatar>
                        <AvatarImage src={review.image} alt="@shadcn" />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                      <h4 className='text-white font-semibold'>{review.user}</h4>
                      </div>
                      <p className="text-white text-center text-sm">{review.review}</p>
                      <div className='flex flex-row gap-3 items-center justify-center'>
                        <p className="text-white text-center text-sm">Rating:</p>
                        <div className='flex flex-row gap-1'>
                       {
                        Array.from({ length: review.rating }).map((_, index) => (
                          <FaStar key={index} className="text-yellow-400" />
                        ))
                      }</div>
                      </div>
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

    {/* FAQs */}
    <div className='br-red-200 md:w-[60%] w-[90%] min-h-32'>
      <h1 className="text-3xl font-bold text-center">FAQs</h1>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">How do I make a reservation?</AccordionTrigger>
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