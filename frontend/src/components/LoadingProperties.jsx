import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LoadingProperties = () => {
    
    const [properties,setProperties]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchProperty=async ()=>{
            try {
                const res=await axios.get("http://localhost:3000/property",{
                    withCredentials:true
                })
                setProperties(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProperty()
    },[])
    if(loading){
        return <div>loading...</div>
    }
    console.log(properties)
  return (
    <div>

      <div className="border-2 border-red-600 p-6 h-fit flex flex-wrap  gap-6 justify-around items-center mt-20">
            {properties.map((props)=>(
                <div key={props.id} className="border-2 border-red-600 h-64 w-72">
                    
                   <img
                    src={props.imageUrl}
                    alt={props.title}
                    className='object-cover'
                   />
                </div>

            ))}
            
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            <div className="border-2 border-red-600 h-64 w-72">

            </div>
            
        </div>
    </div>
  )
}

export default LoadingProperties
