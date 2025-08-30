import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Favorite from '../icons/Favorite'
import Location from '../icons/Location'
import { useNavigate } from 'react-router-dom'

const FavoriteProperties = () => {
    const [favorite,setFavorite]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        const data=async ()=>{
            try {
                const res=await axios.get("http://localhost:3000/favorite",{
                    withCredentials:true
                })
                console.log(res.data.map((fav)=>fav.property))
                setFavorite(res.data.map((fav)=>fav.property))
                
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        data();
    },[])

    if(loading) return <div>loading...</div>
    if(!loading && favorite.length==0){
        return <div className=' flex justify-center items-center w-full h-screen'>
            <div className='text-3xl font-bold'>
                No Favorite List
            </div>
        </div>
    }
  return (
    <div className='bg-gray-200 min-h-screen'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 '>
            {favorite.map((props)=>(
                <div key={props.id} className='relative w-full rounded-2xl overflow-hidden shadow-2xl  '>
                    <img
                        src={props.imageUrl}
                        alt={props.title}
                        className="w-full h-72 object-fill hover:scale-110 transition-transform duration-500 [filter:brightness(65%)]"
                    />
                    
                    <div className='absolute top-5 left-5 bg-gray-200 text-black px-2 py-1 rounded-md font-semibold'>₹{props.price}</div>

                    <div className='absolute top-5 right-5 bg-gray-100 rounded-4xl p-2'><Favorite initialActive={true} propertyId={props.id} /></div>

                    <div className='absolute bottom-3 left-3 text-white'>
                        <h3 className="text-lg font-bold">{props.title}</h3>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-100">
                        <Location/>{props.location},India
                        
                        </div>
                    </div>
                    <div className='absolute text-white bottom-3 right-3'>
                        <button onClick={()=>navigate(`/property/${props.id}`)}  className="mt-2 bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                            View More
                        </button>
                    </div>    
                </div>
            ))}
        
        </div>
    </div>
  )
}

export default FavoriteProperties
