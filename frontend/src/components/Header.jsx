import React, { useState } from 'react'
import { Menu } from '../icons/menu'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
  return (
    <div className='bg-white shadow-2xl'>
      <div className=' border-b-2 border-b-gray-100 h-14 flex items-center'>
        <div className='flex justify-between w-full items-center '>
            <div onClick={()=>navigate("/")} className='font-bold text-xl text-blue-600 pl-4 md:pl-8 lg:pl-14 cursor-pointer'>RealState</div>
            <div className='hidden sm:flex sm:gap-5 sm:pr-10 lg:pr-14'>
                <div onClick={()=>navigate("/favorite")} className='cursor-pointer'>Get favorite</div>
                <div onClick={()=>navigate("/myproperty")} className='cursor-pointer'>My Property</div>
                <div onClick={()=>navigate("/")} className='cursor-pointer'>Buy Property</div>
                <div onClick={()=>navigate("/createProperty")} className='cursor-pointer'>Sell Property</div>
                <div onClick={()=>navigate("/auth/signin")}  className='cursor-pointer'>Login</div>
                <div onClick={()=>navigate("/auth/signup")} className='cursor-pointer'>Register</div>
            </div>

            <div onClick={()=>{setOpen(!open)}} className='cursor-pointer pr-6 sm:hidden '>
              <Menu/>
            </div>

            {open && (
              <div className="absolute top-14 right-0 md:hidden bg-white shadow flex flex-col gap-3 px-4 py-3 z-10 rounded-2xl">
                <div onClick={()=>navigate("/")} className="cursor-pointer">Buy Property</div>
                <div onClick={()=>navigate("/createProperty")} className="cursor-pointer">Sell Property</div>
                <div onClick={()=>navigate("/myproperty")} className="cursor-pointer">My Property</div>
                <div onClick={()=>navigate("/favorite")} className="cursor-pointer">Get favorite</div>
                <div onClick={()=>navigate("/auth/signin")} className="cursor-pointer">Login</div>
                <div onClick={()=>navigate("/auth/signup")} className="cursor-pointer">Register</div>
              </div>
            )}


        </div>
      </div>
    </div>
  )
}

export default Header
