import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function AdminProducts() {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewimg, setpreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName,
      productDescription,
      price,
      previewimg,
    };
  
    try {
      await axios.post("http://localhost:6900/auth/uploadproduct", data);
      toast.success("Product uploaded successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const preview = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    var reader = new FileReader();
    reader.onloadend = function() {
      setpreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Upload New Product</h2>

      <div className="flex flex-col">
        <label htmlFor="productName" className="text-lg font-semibold text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="productDescription" className="text-lg font-semibold text-gray-700">
          Product Description
        </label>
        <textarea
          id="productDescription"
          className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-lg font-semibold text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="productImage" className="text-lg font-semibold text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          id="productImage"
          className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm file:bg-blue-50 file:border-0 file:rounded-md file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
          onChange={preview}
          required
        />
      </div>

      {previewimg && (
        <div className="w-full max-w-xs mx-auto mt-4">
          <img
            className="w-full h-auto rounded-lg border-2 border-gray-300 shadow-lg object-cover"
            src={previewimg}
            alt="Product Preview"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Upload Product
      </button>
      <Toaster />
    </form>
  );
}

export default AdminProducts;
