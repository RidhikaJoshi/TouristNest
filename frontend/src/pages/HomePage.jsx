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

function HomePage() {
    const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/hotels/getAllHotels")
        console.log(response.data);
        setHotels(response.data.data);
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    }
    fetchHotels();

  }, [])


  return (
    
    <div className='w-full min-h-96 flex items-center justify-center'>
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
              <div className="flex flex-col space-y-1">
                <p>Price: {hotel.price}</p>
                <p>Location: {hotel.location}</p>
                <p>Country: {hotel.country}</p>
                <p>State: {hotel.state}</p>
              </div>
            </div>
            
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>View Details</Button>
            <Button>Book Now</Button>
          </CardFooter>
        </Card>
      ))
      }

    </div>
  )
}

export default HomePage