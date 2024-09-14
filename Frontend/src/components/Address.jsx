import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast,Toaster} from 'react-hot-toast';
function Address() {
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:6900/auth/address', {
        withCredentials: true
      });
      if (response.data.address) {
        setAddresses(response.data.address);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (addressId) => {
    const deleteUrl = `http://localhost:6900/auth/address/${addressId}`;
    try {
      await axios.delete(deleteUrl, {
        withCredentials: true,
      });  
      toast.success("deleted the product")
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  if (!addresses || addresses.length === 0) {
    return <div className="text-center text-gray-600 py-6">No addresses available.</div>;
  }

  return (
    <div className="bg-white w-full shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
      <Toaster/>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Addresses</h2>
      <ul className="space-y-6">
        {addresses.map((address) => (
          <li
            key={address._id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex flex-col space-y-2">
              <div className="text-xl font-semibold capitalize text-gray-800">{address.name}</div>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span> {address.address}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">District:</span> {address.district}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">State:</span> {address.state}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Pincode:</span> {address.pincode}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone Number:</span> {address.number}
              </p>
              <button
  onClick={() => handleDelete(address._id)}
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 ease-in-out"
>
  Delete
</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Address;
