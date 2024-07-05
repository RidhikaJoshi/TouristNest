import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import  {useNavigate} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from '@/store/authSlice'
import { GiHamburgerMenu } from "react-icons/gi";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const contents = [
    {
        id: 1,
        content: "Discover Your Perfect Stay"
    },
    {
        id: 2,
        content: "Book Your Dream Vacation Today"
    },
    {
        id: 3,
        content: "Find the Best Hotels at Unbeatable Prices"
    },
    {
        id: 4,
        content: "Your Journey Begins Here"
    },
    {
        id: 5,
        content: "Escape to Luxury, Book with Ease"
    },
    {
        id: 6,
        content: "Stay, Explore, Enjoy"
    },
    {
        id: 7,
        content: "Where Comfort Meets Adventure"
    },
    {
        id: 8,
        content: "Unforgettable Stays, Just a Click Away"
    },
    {
        id: 9,
        content: "Travel Smart, Stay Stylish"
    },
    {
        id: 10,
        content: "Your Home Away From Home"
    },
    {
        id: 11,
        content: "Stay in Style, Travel in Comfort"
    },
    {
        id: 12,
        content: "Experience the Best Stays Worldwide"
    },
    {
        id: 13,
        content: "Easy Booking, Exceptional Stays"
    },
    {
        id: 14,
        content: "Find Your Perfect Getaway"
    },
    {
        id: 15,
        content: "Luxury Stays for Every Budget"
    },
    {
        id: 16,
        content: "Make Every Trip Memorable"
    },
    {
        id: 17,
        content: "Seamless Booking, Stunning Locations"
    },
    {
        id: 18,
        content: "Explore the World, One Hotel at a Time"
    },
    {
        id: 19,
        content: "The Best Stays, Handpicked for You"
    },
    {
        id: 20,
        content: "Stay Better, Travel Further"
    }
];


function Header() {
    const authStatus=useSelector((state)=>state.auth.status);
    // console.log(`${authStatus} ReloadHeader`);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const [position, setPosition] = React.useState("bottom");
     const { toast } = useToast();


    function logoutHandler(){
      dispatch(logout());
      localStorage.setItem('userLoggedIn', 'false');
      localStorage.setItem('userData', JSON.stringify({}));
      toast({
          description: "You are LoggedOut .",
        })
      navigate('/login');
    }

    const NavItems=[
     {
        name:"Home",
        slug:'/',
        active:true
      },
      {
        name:"Add Hotels",
        slug:'/addHotels',
        active:authStatus
      },
      {
        name:"Bookings",
        slug:'/bookingsHistory',
        active:authStatus

      },
      {
        name:"My Profile",
        slug:'/profile',
        active:authStatus
      },
      {
        name:"Login",
        slug:'/login',
        active:!authStatus,
      },
      {
        name:"SignUp",
        slug:'/register',
        active:!authStatus,
      },
    ];


  return (
    <div className='min-h-24 bg-[#16A34A] border-b-[0.1px] border-slate-500 text-white w-full flex flex-row justify-evenly items-center'>
        
        <Link to={'/'}><h1 className='italics text-white font-serif font-semibold text-xl'>TouristNest</h1></Link>
        
 
      <div className='hidden md:block'>
        <Carousel className="w-full max-w-sm" opts={{align: "start", loop: true}} orientation="vertical" plugins={[
            Autoplay({ delay: 4000 })
        ]}>
            <CarouselContent className="-mt-1 h-[100px]">
                {contents.map((content, id) => (
                    <CarouselItem key={id}>
                        <div className="p-5">
                            <Card>
                                <CardContent className="flex items-center justify-center p-1">
                                    <h1 className="text-black text-center">{content.content}</h1>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      </div>
  
        
        {/* For multiple options */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=' text-black' variant="outline"><GiHamburgerMenu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              
                {NavItems.map((item,index)=>{
                  if(item.active){
                    return <Link to={item.slug} key={index}><DropdownMenuRadioItem value={item.name} >{item.name}</DropdownMenuRadioItem></Link>
                  
                  }
                })}
                {
                  authStatus && <DropdownMenuSeparator />
                }
                {
                  authStatus && <DropdownMenuRadioItem value='Logout' onClick={logoutHandler}>Logout</DropdownMenuRadioItem>
                }
                
                
             
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </div>
  )
}

export default Header