import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Dashboard() {
  const [user,setUser] = useState(null)
  useEffect(()=>{
    const oneUser = async()=>{
        const response = await axios.get("http://localhost:6900/auth/user")
        setUser(response.data.user)
        console.log(response.data);
        
    }
    oneUser()
  },[])

  return (
    <div className='w-70% '>

    </div>
  )
}

export default Dashboard;