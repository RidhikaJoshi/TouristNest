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

function HomePage() {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
     const authStatus=useSelector((state)=>state.auth.status);

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
    <div className='w-full min-h-96 flex flex-wrap items-center justify-center p-2.5'>
    <div className='md:w-full w-[90%] min-h-96 flex flex-wrap items-center justify-evenly gap-5 mt-4 mb-4'>
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
  )
}

export default HomePage