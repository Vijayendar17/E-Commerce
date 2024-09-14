import React, { useState } from 'react';
import Nav from './Nav.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useUser } from '../context/Usercontext.jsx';

function Layout() { 
  const [theme, setTheme] = useState('light'); 
  const { user, setuser } = useUser();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Nav toggleTheme={toggleTheme} theme={theme} />
      <div
        className={`${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        } min-h-screen`}
      >
        <ToastContainer />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
