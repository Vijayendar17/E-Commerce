import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faUserCircle, faBoxOpen, faAddressCard, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/Usercontext';

function Nav({ toggleTheme, theme }) {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      ...user,
      user: null,
      token: "",
      email: null
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="w-full bg-black h-16 shadow-md">
      <div className='container mx-auto h-full flex items-center justify-between px-6'>
        <Link to="/">
          <div className='text-white text-3xl font-bold'>
            S<span className='text-xl font-bold'>hop</span>S<span className='text-xl font-bold'>phere</span>
          </div>
        </Link>
        <div className='flex items-center gap-6'>
          <Link to="/cart">
            <div className='flex items-center text-white text-xl gap-1'>
              <FontAwesomeIcon className='h-6' icon={faCartShopping} />
              Cart
            </div>
          </Link>
          <div className='flex items-center'>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center transition-colors duration-300">
                <div
                  className={`absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-6 w-6 transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-white">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </label>
          </div>
          {user.user ? (
            <div
              className='relative'
              onClick={handleDropdownToggle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className='flex flex-col items-center text-white cursor-pointer'>
                <FontAwesomeIcon className='h-7' icon={faUser} />
              </div>
              <div
                className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all duration-300 transform ${isDropdownOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
              >
                <Link to="/myprofile" className='px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg flex items-center'>
                  <FontAwesomeIcon icon={faUserCircle} className="mr-3" />
                  Profile
                </Link>
                <Link to="/myprofile/orders" className='px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center'>
                  <FontAwesomeIcon icon={faBoxOpen} className="mr-3" />
                  Orders
                </Link>
                <Link to="/myprofile/address" className='px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center'>
                  <FontAwesomeIcon icon={faAddressCard} className="mr-3" />
                  Address
                </Link>
                <Link to="/myprofile/notifications" className='px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center'>
                  <FontAwesomeIcon icon={faBell} className="mr-3" />
                  Notifications
                </Link>
                <button onClick={handleLogout} className='w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg flex items-center'>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className='text-white flex items-center'>
              <FontAwesomeIcon className='h-7' icon={faUser} />
              <span className='ml-2'>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
