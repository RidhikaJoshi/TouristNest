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

function HomePage() {
    const [hotels, setHotels] = useState([]);

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

  }, [])


  return (
    
    <div className='w-full min-h-96 flex flex-wrap items-center justify-evenly gap-4 mt-4 mb-4'>
      { hotels && hotels.map((hotel) => (
        <Card className="w-[350px]" key={hotel._id}>
          <CardHeader>
            <CardTitle>{hotel.name}</CardTitle>
            <CardDescription>{hotel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div>
                <img src={hotel.picture} alt={hotel.name} className="w-full h-52 object-cover" />
              </div>
            </div>
            
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>View Details</Button>
            <Button >Book Now</Button>
          </CardFooter>
        </Card>
      ))
      }

    </div>
  )
}

export default HomePage