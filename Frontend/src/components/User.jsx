import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftDashboard from './LeftDasboard';

const User = () => {
  return (

      <div className='w-full flex'>
        <LeftDashboard />
        <Outlet/>
      </div>
    
  );
};


export default User;
