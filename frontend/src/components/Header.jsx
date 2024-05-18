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

function Header() {
    const authStatus=useSelector((state)=>state.auth.status);
    // console.log(`${authStatus} ReloadHeader`);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const [position, setPosition] = React.useState("bottom");


    function logoutHandler(){
      dispatch(logout());
      localStorage.setItem('userLoggedIn', 'false');
      localStorage.setItem('userData', JSON.stringify({}));
      navigate('/login');
    }

    const NavItems=[
     {
        name:"Home",
        slug:'/',
        active:true
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
    <div className='min-h-24 bg-slate-200 border-b-[0.1px] border-slate-500 text-white w-full flex flex-row justify-evenly items-center'>
        
        <h1 className='italics text-black font-serif font-semibold text-xl'>TouristNest</h1>
        
        
        {/* For multiple options */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=' text-black' variant="outline"><GiHamburgerMenu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
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
                
                
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </div>
  )
}

export default Header