import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast , Toaster } from 'react-hot-toast';
import { useCart } from '../context/Cartcontext';
import {Link} from 'react-router-dom'

function Products() {
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:6900/auth/getadminproductdata", { withCredentials: true });
        setProductData(response.data.productdata);
      } catch (error) {
        toast.error('Error fetching product data');
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart",JSON.stringify([...cart,product]))
    toast.success("Product added to cart");
  };

  const handleAddToWishlist = (product) => {
    console.log(`Adding ${product.productname} to wishlist.`);
  };

  return (
    <section className="py-8 antialiased md:py-12">
      <Toaster/>
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
              </ol>
            </nav>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Electronics</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button type="button" className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              Filters
              <svg className="ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
              </svg>
            </button>
            <button type="button" className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              Sort
              <svg className="ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {productData.map((product) => (
            <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="h-56 w-full">
                <Link to={`/product/${product._id}`}>
                  <img className="mx-auto h-full dark:hidden" src={product.image} alt={product.productname} />
                  <img className="mx-auto hidden h-full dark:block" src={product.image} alt={product.productname} />
                </Link>
              </div>
              <div className="pt-6">
                <Link to={`/product/${product._id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{product.productname}</Link>
                <div className="mt-2 flex-col items-center gap-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  <p className=" text-[8px] text-gray-600 dark:text-gray-400">{product.productdescription}</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="flex-grow rounded-lg border-2 border-gray-200 bg-transparent px-4 py-2 text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    aria-label={`Add ${product.productname} to wishlist`}
                  >
                    Add to Wishlist
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-grow rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-white hover:from-blue-600 hover:to-indigo-600 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800"
                    aria-label={`Add ${product.productname} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
