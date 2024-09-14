import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from '@mui/material';

const AllProducts = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:6900/auth/getadminproductdata", { withCredentials: true });
        setProductData(response.data.productdata);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);
    const productdelete = async(productId)=>{
      const deleteproduct = await axios.delete(`http://localhost:6900/auth/deleteadminproductdata/${productId}`,{withCredentials: true})
    }
  return (
    <div className="p-6 w-full">
      {productData.map((product) => (
        <div key={product.id} className="flex bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <img
            src={product.image}
            alt={product.productname}
            className="w-fit h-48 object-cover border-r border-gray-300"
          />
          <div className="p-6 flex flex-col justify-between w-full">
            <div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600">Product Name:</label>
                <h3 className="text-2xl font-bold text-gray-800">{product.productname}</h3>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600">Price:</label>
                <p className="text-lg text-gray-800">${product.price}</p>
              </div>
              <div className="mb-6 ">
                <label className="text-sm font-semibold text-gray-600">Description:</label>
                <p className="text-gray-700">{product.productdescription}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="text-blue-500 hover:text-blue-700">
                <Tooltip title="Edit">
                  <FaEdit size={24} />
                </Tooltip>
              </button>
              <button className="text-red-500 hover:text-red-700">
                <Tooltip title="Delete" onClick={()=>productdelete(product._id)}>
                  <FaTrashAlt size={24} />
                </Tooltip>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
