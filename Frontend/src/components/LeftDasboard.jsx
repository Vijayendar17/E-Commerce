import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/Usercontext';

const MenuItem = ({ to, label }) => (
  <Link to={to} className="w-full">
    <div className="h-12 w-[97%] m-1 bg-gray-600 flex items-center justify-center rounded-xl">
      <h1 className="text-white">{label}</h1>
    </div>
  </Link>
);

function LeftDashboard() {
  const {user} = useUser()
  return (
    <div className="w-[30%] flex flex-col h-screen bg-gray-800 text-white">
      <div className="w-full">
        <div className="w-[97%] h-12 m-1 bg-gray-600 flex items-center justify-center rounded-xl p-1">
          <h1 className="text-white">Hello, <span className="text-xl font-bold">{user.user}</span></h1>
        </div>
        <nav className="flex-grow mt-2">
          <div className="w-full flex flex-col items-center">
            <MenuItem to="" label="User" />
            <MenuItem to="orders" label="Orders" />
            <MenuItem to="address" label="Address" />
            <MenuItem to="notifications" label="My Notifications" />
            <MenuItem to="manageAddress" label="AddNewAddress" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default LeftDashboard;
