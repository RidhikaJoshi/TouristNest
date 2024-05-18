import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import config from "../config/config.js";

function AddHotelsPage() {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [owner, setOwner] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [picture, setPicture] = React.useState("");
   const [tags, setTags] = useState("Full-Service Hotels");
    const [AccessToken,setAccessToken]=useState("");
    const [deploy, setDeploy] = React.useState("Deploy");

 
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log("user", user);
  setOwner(user.user._id);
  setAccessToken(user.accessToken);
}, []);

useEffect(() => {
  console.log("owner", owner);
  console.log("accessToken", AccessToken);
}, [owner, AccessToken]);

    const handleAddHotel = async (e) => {
    e.preventDefault();
    setDeploy("Deploying...");
    //     const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("location", location);
    // formData.append("price", price);
    // formData.append("owner", owner);
    // formData.append("country", country);
    // formData.append("state", state);
    //setTags(document.getElementById("framework").value);
    //formData.append("tags", tags);

    //formData.append("picture", picture);
    console.log("name", name);
    console.log("description", description);
    console.log("location", location);
    console.log("price", price);
        console.log("owner",owner);
        console.log("country",country);
        console.log("state",state);
        console.log("tags",tags);
        console.log("picture",picture);

      //console.log("formData",formData);
        try{
          const response=await axios.post(`${config.BASE_URL}/api/v1/hotels/addHotels`,{
            name:name,
            description:description,
            location:location,
            price:price,
            owner:owner,
            country:country,
            state:state,
            tags:tags,
            picture:picture
          
          },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${AccessToken}`,
              },
            }
          );
          console.log("response",response);
          if(response.status===200)
          {
            setDeploy("Deployed");
            setName("");
            setDescription("");
            setLocation("");
            setPrice("");
            setCountry("");
            setState("");
            setPicture("");
            setTags("");
            navigate("/hotels")
          }
        }catch(error)
        {
          console.log("error",error.message);
        }
    }
//     const handleSelect = (value) => {
//   setTags(value);
// };

  return (
    <div className='min-h-screen w-full bg-slate-400 flex justify-center items-center'>
      <div className='w-[80%]  min-h-72 flex justify-center items-center mt-5 mb-5'>
       <Card className="w-[650px]">
      <CardHeader>
        <CardTitle>Create New Hotel Listing</CardTitle>
        <CardDescription>Deploy your new Hotel Listing in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your Hotel" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Description</Label>
              <Input id="name" placeholder="Enter description of your Hotel"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Price/Night</Label>
              <Input id="name" placeholder="Enter Price per night of your Hotel" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Location</Label>
              <Input id="name" placeholder="Enter Location of your Hotel" value={location} onChange={(e)=>setLocation(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">State</Label>
              <Input id="name" placeholder="Enter State of your Hotel" value={state} onChange={(e)=>setState(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Country</Label>
              <Input id="name" placeholder="Enter Country of your Hotel" value={country} onChange={(e)=>setCountry(e.target.value)}/>
            </div>
            {/* <div className="flex flex-col space-y-2">
              <Label htmlFor="framework">Tags</Label>
               <Select onChange={handleSelect} >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" >
                   <SelectItem value="Full-Service Hotels" selected>Full-Service Hotels</SelectItem>
                    <SelectItem value="Boutique Hotels">Boutique Hotels</SelectItem>
                    <SelectItem value="Budget-Friendly Hotels">Budget-Friendly Hotels</SelectItem>
                    <SelectItem value="Luxury Hotels">Luxury Hotels</SelectItem>
                    <SelectItem value="Resort Hotels">Resort Hotels</SelectItem>
                    <SelectItem value="Business Hotels">Business Hotels</SelectItem>
                    <SelectItem value="Extended-Stay Hotels">Extended-Stay Hotels</SelectItem>
                    <SelectItem value="Eco-Friendly Hotels">Eco-Friendly Hotels</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
              
  
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Picture</Label>
               <Input id="name" type="file" accept="image/gif, image/jpeg, image/png" onChange={(e) => setPicture(e.target.files[0])} className="col-span-3" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" >Cancel</Button>
        <Button onClick={handleAddHotel}>{deploy}</Button>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}

export default AddHotelsPage