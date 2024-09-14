import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'react-hot-toast'
function Slider() {
  const [img,setimg] = useState([])
  useEffect(()=>{
    const fetchimg = async()=>{
      try {
        const response = await axios.get("http://localhost:6900/auth/gethomeimage",{withCredentials: true})
        setimg(response.data.Homeimg);
      } catch (error) {
        toast.error(error)
      }
    }
    fetchimg()
  },[])
  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>
    <div className='w-[90%] rounded-xl  h-[90%]  bg-white'>
      {
        img.map((one)=><div className='w-full h-full'>
          <img src={one.homeImage} className='w-full h-full rounded-xl' alt="" srcset="" />
        </div>)
      }
    </div>
    <Toaster/>
    </div>
  )
}

export default Slider