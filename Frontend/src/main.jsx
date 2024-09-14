import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { UserProvider } from './context/Usercontext';
import User from './components/User';
import PrivateRoute from './pages/auths/PrivateRoute';
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Address from './components/Address';
import Notifications from './components/Notifications';
import NotFound from './components/NotFound';
import Login from './pages/auths/Login';
import Signup from './pages/auths/Signup';
import ManageAddress from './components/manageAddress';
import AdminHome from './components/adminhome';
import AllUsers from './components/alluseradmin';
import Adminproducts from './components/adminproducts';
import Allproduects from './components/Allproduects';
import AdminPhoto from './components/adminphoto';
import { CartProvider } from './context/Cartcontext';
import Productopen from './components/productopen';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "product/:id",
        element: <Productopen/>
      },
      {
        path: "admin",
        element: <Admin /> ,
        children:[
          {
            path: "",
            element: <AdminHome/>
          },
          {
            path:"profile",
            element: <AllUsers/>
          },
          {
            path: "products",
            element: <Adminproducts />
          },
          {
            path: "allproducts",
            element: <Allproduects />
          },
          {
            path: "homelogo",
            element: <AdminPhoto/>
          }

        ]
      },
      {
        path: "myprofile",
        element: <PrivateRoute><User /></PrivateRoute>, 
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "orders",
            element: <Orders />
          },
          {
            path: "address",
            element: <Address />
          },
          {
            path: "notifications",
            element: <Notifications />
          },
          {
            path: "manageAddress",
            element: <ManageAddress />
          }
        ]
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "signup",
    element: <Signup />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
      <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);

