import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import SideAdmin from "./sideAdmin";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:6900/auth/admin", {
          withCredentials: true,
        });

        if (response.data.user === "seller") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        toast.error("Something went wrong");
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>; 
  }

  if (isAdmin === false) {
    return <Navigate to="/" />; 
  }

  return (
    <div className="w-full flex">
    <SideAdmin  />
   <Outlet/>
   </div>
  );
};

export default Admin;
