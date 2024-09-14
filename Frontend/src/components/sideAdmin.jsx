import React from 'react'
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiBox, FiBell, FiSettings } from 'react-icons/fi';
function SideAdmin() {
  return (
            <aside className="w-[30%] min-h-screen bg-black text-white flex flex-col">
                <nav className="flex-1 px-4 py-6">
                    <ul>
                        <li>
                            <Link to="/admin" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiHome size={20} />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/profile" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiUser size={20} />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiBox size={20} />
                                <span>AddProducts</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/allproducts" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiBox size={20} />
                                <span>AllProducts</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/notifications" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiBell size={20} />
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/settings" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiSettings size={20} />
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/homelogo" className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700">
                                <FiSettings size={20} />
                                <span>Homephoto</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
  )
}

export default SideAdmin