import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUsers, FiShoppingCart, FiStar, FiHelpCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
function AdminHome () {
  const [totalUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:6900/auth/adminusers", { withCredentials: true });
        setAllUsers(response.data.allusers.length); 
      } catch (error) {
        toast.error("Data is not fetching");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen w-full  p-8 ">
      
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
      </header>

      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <FiUsers className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Total Users</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{totalUsers}</p>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <FiShoppingCart className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Total Orders</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">567</p>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <FiStar className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pending Reviews</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">23</p>
          </div>
        </div>
      </section>

      
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Orders</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Order ID</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Customer</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Date</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Total</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">#12345</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">John Doe</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">2024-08-22</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">$299.99</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">Shipped</td>
            </tr>
            
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminHome;
