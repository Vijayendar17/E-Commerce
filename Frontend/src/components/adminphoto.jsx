import React, { useEffect, useState } from 'react'
import axios from 'axios';

function AdminPhoto() {
  const [imageoppie,image] = useState();
  const [imageurl, setimage] = useState();
  const [homeImages, setHomeImages] = useState([])
  const handle = async()=>{
    const response = await axios.post("http://localhost:6900/auth/uploadhomeimage",{imageurl})
  }
  const [img,setimg] = useState([])
  useEffect(()=>{
    const fetchimg = async()=>{
      try {
        const response = await axios.get("http://localhost:6900/auth/gethomeimage",{withCredentials: true})
        setHomeImages(response.data.Homeimg);        
      } catch (error) {
        toast.error(error)
      }
    }
    fetchimg()
  },[])

  const deleteHome = async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:6900/auth/deletehomeimage/${id}`, { withCredentials: true })
      setHomeImages(homeImages.filter(image => {
        console.log('Comparing', image._id, 'with', id); 
        return image._id !== id;
      }));
    } catch (error) {
      console.error(error)
    }
}

  const imagepreview =(e) =>{
    const file = e.target.files[0];
    image(file);
    var reader = new FileReader();
    reader.onloadend = function() {
      setimage(reader.result);
    }
    reader.readAsDataURL(file);
  }
  
  return (
    <div className='flex flex-col w-full'>
    <div className='w-full flex-col justify-center flex items-center'>
    <form className='w-full flex flex-col justify-center items-center' onSubmit={handle}>
    <div className="flex flex-col justify-center w-full">
        <label htmlFor="productImage" className="text-lg font-semibold text-gray-700">
          HomeImage
        </label>
        <input
          type="file"
          className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
          onChange={imagepreview}
          required
        />
      </div>
      <button type='submit' className='bg-red-500 mt-2 w-[100px] h-[60px] p-3 rounded-lg font-bold'>Submit</button>
    </form>
    <div className='w-full h-full rounded-3xl flex justify-center items-center' >
      <img src={imageurl} alt="" srcset="" />
    </div>
    </div>
    
    <div>
    <div className="w-full mt-4 grid grid-cols-3 gap-4">
        {homeImages.map((oneImg, index) => (
          <div key={index} className="p-2 border rounded-lg">
            <img src={oneImg.homeImage} alt={`Home Image ${index}`} className="w-full h-[150px] object-cover" />
            <div>
            <button
                onClick={() => deleteHome(oneImg._id)} 
                className='w-12 bg-red-200 items-center h-8 justify-center flex'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default AdminPhoto;