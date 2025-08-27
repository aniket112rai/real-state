import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Location from '../icons/Location';
import Favorite from '../icons/Favorite';
import Chat from '../icons/Chat';
import Profile from '../icons/Profile';
import Mail from '../icons/Mail';

const ViewProperty = () => {
    const { propertyId }=useParams();
    const [propertyData,setPropertyData]=useState(null)
    const [fav,setFav]=useState(false)
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res=await axios.get(`http://localhost:3000/property/${propertyId}`,{
                    withCredentials:true
                })

                const fav=await axios.get(`http://localhost:3000/favorite`,{
                    withCredentials:true
                })
                setPropertyData(res.data)
                console.log(fav.data)
                const found=fav.data.some(favres=>favres.propertyId=== res.data.id)
                setFav(found);

                
                //console.log(fav.data.find(fav=>fav.propertyId)))
                

            } catch (error) {
                console.log("something went wrong",error)
            }
        }
        fetchData();
    },[propertyId])
    
    console.log(propertyData)
    console.log(fav)
  return (
    <div className="bg-gray-200 p-6 min-h-screen  ">
    {propertyData?
        <div className="max-w-5xl mx-auto">
        
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
          <img
            src={propertyData.imageUrl}
            alt={propertyData.title}
            className=" w-full h-full object-fill md:object-cover rounded-xl [filter:brightness(65%)] "
          />
          <div className="absolute bottom-1 left-1 md:bottom-3 md:left-3 flex flex-col justify-end p-3 rounded-xl">
            <h1 className="text-md md:text-3xl font-bold text-white">
              {propertyData.title}
            </h1>
            <div className="text-md md:text-lg text-gray-100 flex items-center gap-2"><Location/> {propertyData.location}, India</div>
            <div className=" text-md md:text-2xl font-semibold text-green-400 mt-1 md:mt-2">
              ₹{propertyData.price.toLocaleString()}
            </div>
          </div>
        </div>

        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Property Details</h2>
            <div className="text-gray-700 leading-relaxed">
              {propertyData.description}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg">Additional Info:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Location: {propertyData.location}</li>
                <li>Price: ₹{propertyData.price.toLocaleString()}</li>
              </ul>
            </div>
          </div>

          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-3">Owner Info</h2>
            <div className="text-gray-700 flex items-center gap-3"><Profile/> {propertyData.owner.name}</div>
            <div className="text-gray-600 flex items-center gap-3"><Mail/> {propertyData.owner.email}</div>

            <div className="mt-4 flex gap-5">
              <button onClick={()=>setFav(!fav)} className="px-2 py-2 rounded-3xl shadow-xl border-0 border-gray-200 ">
                <Favorite initialActive={fav} propertyId={propertyData.id} />
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 flex items-center gap-1">
                <Chat/> Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    
    
    :<div>Loading...</div>}
  </div>
  )
}


export default ViewProperty