import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Location from '../icons/Location'

const MyProperty = () => {
    const navigate=useNavigate()
    const [properties,setProperties]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        
        const fetchData=async ()=>{
            try {
                const res=await axios.get("http://localhost:3000/property/me",{
                    withCredentials:true
                })
                setProperties(res.data)
                setLoading(false);


            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
        fetchData();
        
    },[])

    const handledelete=async (propertyId)=>{
        try {
            await axios.delete(`http://localhost:3000/property/${propertyId}`,{
                withCredentials:true
            })
            setProperties((prev) => prev.filter((prop) => prop.id !== propertyId));
            

        } catch (error) {
            console.log(error)
        }
    }

    if(loading){
        return <div>loading...</div>
    }
    console.log(properties)
    if(!loading && properties.length==0){
        return <div className=' w-full h-screen flex justify-center items-center'>
            <div className='text-4xl font-bold'>No Property in your name</div>
        </div>
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-200 '>
        {properties.map((props)=>(
            <div key={props.id} className='relative w-full rounded-2xl overflow-hidden shadow-2xl  '>
                <img
                    src={props.imageUrl}
                    alt={props.title}
                    className="w-full h-72 object-fill hover:scale-110 transition-transform duration-500 [filter:brightness(65%)]"
                />
                
                <div className='absolute top-5 left-5 bg-gray-200 text-black px-2 py-1 rounded-md font-semibold'>₹{props.price.toLocaleString()}</div>


                <div className='absolute bottom-3 left-3 text-white'>
                    <h3 className="text-lg font-bold">{props.title}</h3>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-100">
                    <Location/>{props.location},India
                     
                    </div>
                </div>
                <div className='absolute text-white bottom-3 right-3 flex flex-col justify-center'>
                    <button onClick={()=>navigate(`/myproperty/update/${props.id}`)} className='mt-2 bg-green-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-700 transition' >
                        Update
                    </button>
                    
                    <button onClick={()=>navigate(`/property/${props.id}`)} className="mt-2 bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                        View More
                    </button>
                </div>    
                <div className='absolute top-3 right-3 text-white '>
                    <button onClick={()=>handledelete(props.id)} className='mt-2 bg-red-500 px-6 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition' >
                        Delete
                    </button>
                </div>
            </div>
        ))}
      
    </div>
  )
}

export default MyProperty
